import { useTheme } from "next-themes";
import { useState } from "react";
import { icons } from "../utils/icons";
import regionOptions from "../utils/regionOptions.json";
import timePeriodOptions from "../utils/regionOptions.json";
import Dropdown from "./DropdownToolBar";

const numResultsOptions = Array.from({ length: 10 }, (_, i) => i + 1).map(
  (num) => ({
    value: num,
    label: `${num} result${num === 1 ? "" : "s"}`,
  })
);

function Toolbar() {
  const [webAccess, setWebAccess] = useState(true);
  const [numResults, setNumResults] = useState(3);
  const [timePeriod, setTimePeriod] = useState("");
  const [region, setRegion] = useState("wt-wt");

  const { systemTheme, theme, setTheme } = useTheme();

  const webAccessToggle = (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={webAccess}
        onChange={() => {
          const themeSetting = theme === "light" ? "dark" : "light";
          setTheme(themeSetting);
        }}
      />
      <div className="w-9 h-5 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
      <span className="ml-1 text-sm md:after:content-['Search_on_the_web'] after:content-['Web']" />
    </label>
  );

  return (
    <div className="w-full flex justify-between items-center gap-2 mt-0 p-0 rounded-md">
      <div
        className="btn btn-xs border-none bg-white text-txt-main"
        onClick={() => {}}
      >
        {icons.tune}
      </div>

      {webAccessToggle}

      <Dropdown
        value={numResults}
        onChange={() => {}}
        options={numResultsOptions}
      />

      <Dropdown
        value={timePeriod}
        onChange={() => {}}
        options={timePeriodOptions}
      />
      <Dropdown value={""} onChange={() => {}} options={regionOptions} />

      <div className="dropdown dropdown-top" onClick={() => {}}>
        <div
          tabIndex={0}
          className="flex items-center gap-0 flex-row cursor-pointer"
        >
          <label className="btn btn-primary bg-white text-txt-main border-none text-sm normal-case font-normal">
            Default prompt
          </label>
          {icons.expand}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-0 m-0 rounded-md w-52 bg-gray-800
                max-h-96 overflow-auto
                flex flex-col flex-nowrap"
        ></ul>
      </div>
    </div>
  );
}

export default Toolbar;
