import type { AppProps } from "next/app";
import GlobalStyles from "../styles/GlobalStyles";
import storeWrapper from "../store/storeWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default storeWrapper.withRedux(MyApp);

