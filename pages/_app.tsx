import type { AppProps } from "next/app";
import DefaultLayout from "../layout/DefaultLayout";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import StoreProvider from "../providers/StoreProvider";

function MyApp({ Component, pageProps }: AppProps) {
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
