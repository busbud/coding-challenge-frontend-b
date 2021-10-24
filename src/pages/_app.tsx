import { AppProps } from "next/app";

import { GlobalStyles } from "@/components/GlobalStyles";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
