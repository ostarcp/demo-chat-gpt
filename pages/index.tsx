import { log } from "console";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { uid } from "uid";
import Hero from "../components/Hero";
import Input from "../components/Input";
import QandAItem from "../components/QandAItem";
import { useStoreContext } from "../providers/StoreProvider";
import { isEmpty } from "../utils/helper";

const PAGE_ID = uid(16);

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [qAndA, setQandA] = useState<any[]>([]);
  const { store, setStore, getStoreVal, updateStoreById } = useStoreContext();
  const route = useRouter();
  const bottomRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [qAndA?.length, loading]);

  const isNewChat = route.pathname === "/";
  const isEmptyQandA = qAndA?.length === 0;

  const listAnswer =
    useMemo(() => {
      return qAndA?.reduce?.((acc: string, current, index) => {
        return isEmpty(acc) ? current.q : (acc = acc + " ," + current.q);
      }, "");
    }, [qAndA.length]) ?? "";


  const onChangeText = (e: any) => {
    const txt = e.target.value;
    setText(txt);
  };

  const askTheAI = async () => {
    if (!text && !text?.trim()) return;
    setText("");
    setLoading(true);

    try {
      const qAndAObj = {
        id: new Date().getTime(),
        q: text,
        a: "",
      };

      setQandA((pre: any) => [...pre, qAndAObj]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: isEmpty(listAnswer)
            ? text
            : `here is my previous question ${listAnswer} that i wrap each question in [] and i would like to ask about ` +
              text,
        }),
      });

      if (!response.ok) {
        setQandA((prev: any) => {
          const preCopy = structuredClone(prev);
          const idx = preCopy.findIndex(
            (item: any) => item.id === qAndAObj?.id
          );
          preCopy[idx].a = "ERROR! please try again later";

          return preCopy;
        });

        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        qAndAObj.a += chunkValue;

        setQandA((prev: any) => {
          const preCopy = structuredClone(prev);
          const idx = preCopy.findIndex(
            (item: any) => item.id === qAndAObj?.id
          );
          preCopy[idx].a += chunkValue;

          return preCopy;
        });
      }

      if (!isNewChat) return;

      if (Boolean(getStoreVal(PAGE_ID))) {
        updateStoreById(PAGE_ID, [...qAndA, qAndAObj]);
        return;
      }
      setStore([...store, { id: PAGE_ID, qAndA: [...qAndA, qAndAObj] }]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isEmptyQandA ? (
        <>
          <Hero />
          <div className="my-8" />
        </>
      ) : null}

      <div className="w-full max-h-[36rem] overflow-y-auto">
        {qAndA?.map?.((item: any, index: any) => {
          const isLoading = loading && index + 1 === qAndA.length;
          return (
            <div className="w-full" key={`key-${item?.id}-${index}`}>
              <QandAItem isChat={false} content={item?.q || ""} />
              <QandAItem isLoading={isLoading} isChat content={item?.a || ""} />
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="w-full bg-white dark:bg-dark absolute bottom-10 px-4">
        <div className="m-auto max-w-[50rem]">
          <Input
            value={text}
            onChangeText={onChangeText}
            onClick={askTheAI}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
