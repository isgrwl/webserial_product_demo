import "bootstrap/dist/css/bootstrap.css";
import "../css/globals.css";

import StatusBar from "@ui/StatusBar";
import { SerialProvider } from "@context/SerialContext";
import { AppProvider } from "@context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <SerialProvider>
      <AppProvider>
        <StatusBar ></StatusBar>
        <Component {...pageProps} />
      </AppProvider>
    </SerialProvider>
  );
}

export default MyApp;
