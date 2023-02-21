import type { AppProps } from "next/app";
import DefaultLayout from "../layout/DefaultLayout";
import "../styles/globals.css";
import "../styles/typing.module.css";
import { ThemeProvider } from "next-themes";
import StoreProvider from "../providers/StoreProvider";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    console.log("version: 1.2.0");
    
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <ThemeProvider defaultTheme="light" enableSystem attribute="class">
      <StoreProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;
