import type { NextPage } from "next";
import Hero from "../components/Hero";
import Input from "../components/Input";
import Toolbar from "../components/Toolbars";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="my-8" />

      <div className="w-full bg-white sticky bottom-0 left-0 p-4">
        {/* <ButtonResetRespone /> */}
        <div className="m-auto max-w-[50rem]">
          <Input />
          {/* <Toolbar /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
