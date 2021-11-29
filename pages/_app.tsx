import type { AppProps } from "next/app";
import { StylesProvider } from "@material-ui/core";
import storeWrapper from "../store/storeWrapper";
import GlobalStyles from "../styles/GlobalStyles";


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <StylesProvider injectFirst>
        <Component {...pageProps} />
      </StylesProvider>
    </>
  );
};

export default storeWrapper.withRedux(MyApp);

