import { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyles } from "@/components";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Osheaga – Festival Musique et Arts</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
