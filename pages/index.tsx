import type { NextPage } from "next";
import { useState } from "react";
import Hero from "../components/Hero";
import Input from "../components/Input";
import QandAItem from "../components/QandAItem";
import Toolbar from "../components/Toolbars";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [qAndA, setQandA] = useState<any[]>([]);

  const isEmptyQandA = qAndA?.length === 0;

  const onChangeText = (e: any) => {
    const txt = e.target.value;
    setText(txt);
  };

  const askTheAI = async () => {

    if(!text && !text.trim()) return;

    setText("");
    const id = new Date().getTime();
    setQandA((pre: any) => [...pre, { id: id, q: text, a: "" }]);

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
      }),
    });

    if (!response.ok) {
      console.log('response.statusText', response);
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;

    if (!data) {
      return;
    }

    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setQandA((prev: any) => {
    //     const preCopy = structuredClone(prev);
    //     const idx = preCopy.findIndex((item: any) => item.id === id);

    //     preCopy[idx].a = preCopy[idx].a + chunkValue;

    //     return preCopy;
    //   });
    // }
  };

  return (
    <div className="flex flex-col items-center">
      {isEmptyQandA && <Hero />}
      <div className="my-8" />

      {qAndA?.map?.((item: any, index: any) => {
        return (
          <div className="w-full" key={`key-${item?.id}-${index}`}>
            <QandAItem isChat={false} content={item?.q || ""} />
            <QandAItem isChat content={item?.a || ""} />
          </div>
        );
      })}

      <div className="w-full bg-white absolute bottom-5 p-4">
        {/* <ButtonResetRespone /> */}
        <div className="m-auto max-w-[50rem]">
          <Input value={text} onChangeText={onChangeText} onClick={askTheAI} />
        </div>
      </div>
    </div>
  );
};

export default Home;
