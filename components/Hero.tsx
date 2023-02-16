import React from "react";
import { icons } from "../utils/icons";

function Hero() {
  return (
    <>
      <div className="w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 items-center">
        <h1
          className={`my-14 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-bold`}
        >
          U2Chat
        </h1>

        <div className="md:flex items-start text-center gap-3.5 text-txt-main">
          <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
            <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
              {icons.lightPub}
              Capabilities
            </h2>

            <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto text-sm">
              <button className="w-full p-2 rounded-md bg-input-bg hover:bg-gray-300">
                "Explain quantum computing in simple terms" →
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg hover:bg-gray-300">
                "Got any creative ideas for a 10 year old's birthday?" →
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg hover:bg-gray-300">
                "How do I make an HTTP request in Javascript?" →
              </button>
            </ul>
          </div>

          <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 text-txt-main">
            <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
              {icons.lighning}
              Limitation
            </h2>

            <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto text-sm">
              <button className="w-full p-2 rounded-md bg-input-bg">
                Remembers what user said earlier in the conversation
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg">
                Allows user to provide follow-up corrections
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg">
                Trained to decline inappropriate requests
              </button>
            </ul>
          </div>

          <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 text-txt-main">
            <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
              {icons.warning}
              Examples
            </h2>

            <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto text-sm">
              <button className="w-full p-2 rounded-md bg-input-bg">
                May occasionally generate incorrect information
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg">
                May occasionally produce harmful instructions or biased content
              </button>
              <button className="w-full p-2 rounded-md bg-input-bg">
                Limited knowledge of world and events after 2021
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
