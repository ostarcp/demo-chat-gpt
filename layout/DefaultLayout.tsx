import React, { ReactElement } from "react";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import { useStoreContext } from "../providers/StoreProvider";
import { icons } from "../utils/icons";
interface DefaultLayoutI {
  children: ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutI> = ({ children }) => {
  return (
    <div className="dark:bg-dark bg-white">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2">
          <div
            className={"w-full mt-4 flex items-center"}
            style={{ justifyContent: "space-between" }}
          >
            <label htmlFor="my-drawer-2">
              <div className="btn border-non text-txt-main lg:invisible visible">
                {icons.tune}
              </div>
            </label>

            <img className="w-8" src="../avatar.png" />
          </div>

          <main className="w-full">{children}</main>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default React.memo(DefaultLayout);
