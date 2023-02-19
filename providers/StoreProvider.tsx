import React, { createContext, ReactNode, useRef, useState } from "react";

type Props = {
  setStore: (data: any) => void;
  store: {
    q: string;
    a: string;
  }[];
};

export const StoreContext = createContext<Props>({
  setStore: () => {},
  store: [],
});

export const useStoreContext = () => React.useContext(StoreContext);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  //! State
  const [storeData, setStoreData] = useState<any[]>([]);

  const setStore = (data: any) => {
    setStoreData([...storeData, ...data]);
  };

  // const getStore = React.useCallback(() => {}, []);

  const value: any = React.useMemo(() => {
    return {
      store: storeData,
      setStore,
    };
  }, [setStore, storeData]);

  //! Return
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
