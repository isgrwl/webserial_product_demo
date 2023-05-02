import "bootstrap/dist/css/bootstrap.css";
import "../css/globals.css";
import { useState, useEffect, createContext } from "react";
import StatusBar from "@ui/StatusBar";
import { stringifyQuery } from "next/dist/server/server-route-utils";
import { AppProvider } from "@context/AppContext";
import { RunProvider } from "@context/RunContext";
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <RunProvider>
        <StatusBar ></StatusBar>
        <Component {...pageProps} />
      </RunProvider>
    </AppProvider>
  );
}

export default MyApp;
