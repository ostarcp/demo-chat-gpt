import React, { ReactElement } from "react";
import NavBar from "../components/NavBar";
interface DefaultLayoutI {
  children: ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutI> = ({ children }) => {
  return (
    <div className=" dark:bg-dark bg-white">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2">
          <div
            className={"w-full mt-4 flex items-end"}
            style={{ justifyContent: "end" }}
          >
            <img className="w-8" src="../avatar.png" />
          </div>
          <main className="w-full">{children}</main>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default DefaultLayout;
