import React, { createContext, ReactNode, useEffect, useState } from "react";
import { isEmpty } from "../utils/helper";

type Store = {
  id: string;
  qAndA: { id: string; q: string; a: string }[];
};

type Config = {
  webAccess: boolean;
  numWebResults: number;
  timePeriod: string;
  region: string;
};

const USER_LOCAL_STORAGE = "U2CHATMENU";
const USER_CONFIG_STORAGE = "U2CHATUSERCONFIG";

const getUserLocalStorage = () => {
  const dataUser = localStorage.getItem(USER_LOCAL_STORAGE);
  if (!!dataUser) {
    return JSON.parse(dataUser);
  }
  return {};
};

const saveUserLocalStorage = (storeData: any) => {
  localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(storeData));
};

const getUserConfigLocalStorage = () => {
  const dataUser = localStorage.getItem(USER_CONFIG_STORAGE);
  if (!!dataUser) {
    return JSON.parse(dataUser);
  }
  return {};
};

const saveUserConfigLocalStorage = (storeData: any) => {
  localStorage.setItem(USER_CONFIG_STORAGE, JSON.stringify(storeData));
};

interface IStoreContext {
  setStore: (data: any) => void;
  updateStoreById: (id: string, data: any[]) => void;
  store: Store[];
  deleteStore: () => void;
  deleteStoreById: () => void;
  getStoreVal: (id: string) => any;
  userConfig: Config;
  saveConfig: (data: Config) => void;
}

export const StoreContext = createContext<IStoreContext>({
  setStore: () => {},
  updateStoreById: () => {},
  store: [],
  deleteStore: () => {},
  deleteStoreById: () => {},
  getStoreVal: () => {},
  userConfig: {
    webAccess: false,
    numWebResults: 3,
    region: "wt-wt",
    timePeriod: "",
  },
  saveConfig: (data: Config) => {},
});

export const useStoreContext = () => React.useContext(StoreContext);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  //! State
  const localStoreData = getUserLocalStorage();
  const userConfigData = getUserConfigLocalStorage();
  const [storeData, setStoreData] = useState<Store[]>(localStoreData || []);
  const [userConfig, setUserConfig] = useState<Store>(
    userConfigData || {
      webAccess: false,
      numWebResults: 3,
      region: "wt-wt",
      timePeriod: "",
    }
  );

  const setStore = React.useCallback((data: any) => {
    setStoreData(data);
    saveUserLocalStorage(data);
  }, []);

  const saveConfig = React.useCallback((data: any) => {
    setUserConfig(data);
    saveUserConfigLocalStorage(data);
  }, []);

  useEffect(() => {
    if (!isEmpty(localStoreData)) {
      setStore(localStoreData);
    }
  }, [setStore]);

  useEffect(() => {
    if (!isEmpty(userConfigData)) {
      saveConfig(userConfigData);
    }
  }, [saveConfig]);

  const getStoreVal = React.useCallback(
    (id: string) => {
      return storeData.find((item) => item.id == id) || null;
    },
    [storeData]
  );

  const updateStoreById = React.useCallback(
    (id: string, newQandA: any) => {
      const index = storeData.findIndex((el) => el.id == id);
      if (index !== -1) {
        const store = structuredClone(storeData);
        store[index].qAndA = structuredClone(newQandA);
        setStoreData(store);
        saveUserLocalStorage(store);
      }
    },
    [storeData]
  );

  const deleteStoreById = React.useCallback(
    (id: string) => {
      const filterData = storeData.filter((el) => el.id !== id);
      setStoreData(filterData);
      saveUserLocalStorage(filterData);
    },
    [storeData]
  );

  const deleteStore = React.useCallback(() => {
    setStoreData([]);
    saveUserLocalStorage([]);
  }, []);

  const value: any = React.useMemo(() => {
    return {
      store: storeData,
      setStore,
      updateStoreById,
      deleteStore,
      deleteStoreById,
      getStoreVal,
      userConfig,
      saveConfig,
    };
  }, [setStore, storeData, updateStoreById, deleteStoreById, userConfig]);

  //! Return
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
