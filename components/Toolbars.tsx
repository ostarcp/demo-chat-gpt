import { useCallback, useEffect, useState } from "react";
import { icons } from "../utils/icons";
import regionOptions from "../utils/regionOptions.json";
import timePeriodOptions from "../utils/times.json";
import Dropdown from "./DropdownToolBar";
import { useStoreContext } from "../providers/StoreProvider";
import { isEmpty } from "../utils/helper";
import { log } from "console";

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

  const { userConfig, saveConfig } = useStoreContext();

  useEffect(() => {
    if (!isEmpty(userConfig)) {
      setWebAccess(userConfig?.webAccess);
      setNumResults(userConfig?.numWebResults);
      setTimePeriod(userConfig?.timePeriod);
      setRegion(userConfig?.region);
    }
  }, [userConfig]);

  const handleWebAccessToggle = useCallback(() => {
    setWebAccess(!webAccess);
    saveConfig({ ...userConfig, webAccess: !webAccess });
  }, [webAccess, userConfig]);

  const handleNumResultsChange = useCallback(
    (e: { target: { value: string } }) => {
      const value = parseInt(e.target.value);
      setNumResults(value);
      saveConfig({ ...userConfig, numWebResults: value });
    },
    [numResults, userConfig]
  );

  const handleTimePeriodChange = useCallback(
    (e: { target: { value: string } }) => {
      setTimePeriod(e.target.value);
      saveConfig({ ...userConfig, timePeriod: e.target.value });
    },
    [timePeriod, userConfig]
  );

  const handleRegionChange = useCallback(
    (e: { target: { value: string } }) => {
      setRegion(e.target.value);
      saveConfig({ ...userConfig, region: e.target.value });
    },
    [region, userConfig]
  );

  const webAccessToggle = (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={webAccess}
        onChange={handleWebAccessToggle}
      />
      <div className="w-9 h-5 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
      <span className="ml-1 text-sm md:after:content-['Search_on_the_web'] after:content-['Web']" />
    </label>
  );

  return (
    <div className="w-full flex justify-between items-center gap-2 mt-0 p-0 rounded-md">
      <div className="btn btn-xs border-none bg-white dark:bg-dark text-txt-main pointer-events-none">
        {icons.tune}
      </div>
      {webAccessToggle}

      <Dropdown
        value={numResults}
        onChange={handleNumResultsChange}
        options={numResultsOptions}
      />

      <Dropdown
        value={timePeriod}
        onChange={handleTimePeriodChange}
        options={timePeriodOptions}
      />
      <Dropdown
        value={region}
        onChange={handleRegionChange}
        options={regionOptions}
      />

      <div className="dropdown dropdown-top invisible">
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
