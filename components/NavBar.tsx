import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { icons } from "../utils/icons";
import Button from "./Button";

const LI_STYLE = "text-txt-white my-2 -ml-2 text-sm font-medium";

export default function NavBar() {
  const { setTheme, theme } = useTheme();
  const route = useRouter();
  // console.log(route);

  const isActive = route.pathname === "/history";

  const themeSetting = theme === "dark" ? "light" : "dark";

  const setAppTheme = useCallback(() => {
    setTheme(themeSetting);
  }, [themeSetting]);

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-6 w-80 bg-dark text-base-content ">
          <Link href={"/"}>
            <div className="logo mb-14 cursor-pointer">{icons.logo}</div>
          </Link>
          <div className="overflow-y-auto h-48">
            <li>
              <a
                href="/history"
                className={`${LI_STYLE} ${isActive ? "bg-active" : null}`}
              >
                {icons.messageNav}Create User flow
              </a>
            </li>
            <li>
              <a className={LI_STYLE}>{icons.messageNav}Design strategy</a>
            </li>
            <li>
              <a className={LI_STYLE}>{icons.messageNav}Roadmap</a>
            </li>
            <li>
              <a className={LI_STYLE}>{icons.messageNav}Library</a>
            </li>
          </div>
          <div className="mt-8" />

          <Link href={"/"}>
            <Button title="New chat" icon={icons.plusIcon} />
          </Link>
          
          <div className="divider"></div>

          <li>
            <a className={LI_STYLE}>{icons.trash}Clear conversation</a>
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