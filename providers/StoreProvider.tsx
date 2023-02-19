import React, {
  createContext,
  ReactNode,
  useEffect, useState
} from "react";
import { isEmpty } from "../utils/helper";

type Store = {
  id: string;
  qAndA: { id: string; q: string; a: string }[];
};

const USER_LOCAL_STORAGE = "U2CHATMENU";

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

interface IStoreContext {
  setStore: (data: any) => void;
  updateStoreById: (id: string, data: any[]) => void;
  store: Store[];
  deleteStore: () => void;
  deleteStoreById: () => void;
  getStoreVal: (id: string) => any;
}

export const StoreContext = createContext<IStoreContext>({
  setStore: () => {},
  updateStoreById: () => {},
  store: [],
  deleteStore: () => {},
  deleteStoreById: () => {},
  getStoreVal: () => {},
});

export const useStoreContext = () => React.useContext(StoreContext);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  //! State
  const localStoreData = getUserLocalStorage();
  const [storeData, setStoreData] = useState<Store[]>(localStoreData || []);

  const setStore = React.useCallback((data: any) => {
    setStoreData(data);
    saveUserLocalStorage(data);
  }, []);

  useEffect(() => {
    if (!isEmpty(localStoreData)) {

      setStore(localStoreData);
    }
  }, [setStore]);

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
    };
  }, [setStore, storeData, updateStoreById, deleteStoreById]);

  //! Return
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
