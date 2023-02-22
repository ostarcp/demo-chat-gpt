import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export interface OpenAIStreamPayload {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            console.log(e);
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}

export interface SearchResult {
  body: string;
  href: string;
  title: string;
}

export async function searchWithPropt(
  query: string,
  numResults: number,
  timePeriod: string,
  region: string
): Promise<SearchResult[]> {
  const url =
    `https://ddg-webapp-aagd.vercel.app/search?` +
    `max_results=${numResults}` +
    `&q=${query}` +
    (timePeriod ? `&time=${timePeriod}` : "") +
    (region ? `&region=${region}` : "");

  const response = await fetch(url);
  const results = await response.json();
  return results.map((result: any) => {
    return {
      body: result.body,
      href: result.href,
      title: result.title,
    };
  });
}
