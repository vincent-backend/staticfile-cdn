import config from "@config/config.json";
import theme from "@config/theme.json";
import { LanguageProvider } from "contexts/LanguageContext";

import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";

import "styles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import localFont from "next/font/local";

const primaryFont = localFont({
  src: [
    {
      path: "../font/PingFang-SC-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/PingFang-SC-Bold.ttf",
      weight: "600",
      style: "bold",
    },
  ],
  variable: "--font-pingfang",
});

const App = ({ Component, pageProps }) => {
  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`${primaryFont.variable}`}>
      <Head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <LanguageProvider>
        <NextNProgress color="#1cbc9c" options={{ showSpinner: false }} />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </LanguageProvider>
    </main>
  );
};

export default App;
