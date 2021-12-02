import type { AppProps } from 'next/app';
import { StylesProvider } from '@material-ui/core';
import GlobalStyles from '../styles/GlobalStyles';
import { wrapper } from '../store';


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

export default wrapper.withRedux(MyApp);


