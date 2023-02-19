import React, { createContext, ReactNode, useRef } from "react";

type Props = {};

export const StoreContext = createContext<any>({
  setStore: () => {},
  getStore: () => {},
});

export const useStoreContext = () => React.useContext(StoreContext);

const CacheManageProvider = ({ children }: { children: ReactNode }) => {
  //! State
  const cacheStorage = useRef<any>(null);

  const setStore = (data: any) => {};

  const getStore = React.useCallback(() => {}, []);

  const value: any = React.useMemo(() => {
    return {
      setStore,
      getStore,
    };
  }, [setStore, getStore]);

  //! Return
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default CacheManageProvider;
