import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useStoreContext } from "../providers/StoreProvider";
import { icons } from "../utils/icons";
import Button from "./Button";

const LI_STYLE = "text-txt-white my-2 -ml-2 text-sm font-medium";

export default function NavBar() {
  const { store, deleteStore } = useStoreContext();
  const [toggleDelete, setToggleDelete] = useState(false);

  const { setTheme, theme } = useTheme();
  const route = useRouter();

  const isHome = route.pathname === "/";

  const themeSetting = theme === "dark" ? "light" : "dark";

  const setAppTheme = useCallback(() => {
    setTheme(themeSetting);
  }, [themeSetting]);

  const toggleClear = useCallback(() => {
    setToggleDelete((pre) => !pre);
  }, []);

  const onClearConversation = useCallback(() => {
    !isHome ? route.push("/") : route.reload();
    deleteStore();
    setToggleDelete(false);
  }, [isHome, toggleDelete]);

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-6 w-80 bg-dark text-base-content flex justify-between ">
          <div className="flex-1">
            <Link href={"/"}>
              <div className="logo mb-14 cursor-pointer">{icons.logo}</div>
            </Link>
            <div className="max-h-48 overflow-y-auto h-fit">
              {store?.map?.((item) => (
                <li key={`${item.id}-link-a`}>
                  <a
                    href={`/${item.id}`}
                    className={`${LI_STYLE} ${
                      route?.query?.id === item?.id ? "bg-active" : null
                    }`}
                  >
                    {icons.messageNav} {item?.qAndA?.[0]?.q}
                  </a>
                </li>
              ))}
            </div>
            <div className="mt-8" />
            <Link href={"/"}>
              <Button title="New chat" icon={icons.plusIcon} />
            </Link>

            <div className="divider"></div>
          </div>

          <li>
            {!toggleDelete ? (
              <a className={LI_STYLE} onClick={toggleClear}>
                {icons.trash} {"Clear conversation"}
              </a>
            ) : (
              <li className="flex flex-row justify-evenly p-0">
                <a className={LI_STYLE} onClick={onClearConversation}>
                  YES
                </a>
                <a className={LI_STYLE} onClick={toggleClear}>
                  NO
                </a>
              </li>
            )}
            <a className={LI_STYLE} onClick={setAppTheme}>
              {icons.dark}Dark mode
            </a>
            <a className={LI_STYLE}>{icons.discord}OpenAI Discord</a>
            <a className={LI_STYLE}>{icons.update}Updates & FAQ</a>
            <a className={LI_STYLE}>{icons.logOut}Log out</a>
          </li>
        </ul>
      </div>
    </>
  );
}
