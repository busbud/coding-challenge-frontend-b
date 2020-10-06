import React from "react";

import { keyframes } from "@emotion/core";
import { Box } from "@chakra-ui/core";
import { PageSlice } from "./index";

import biodomeImageUrl from "../../shared/assets/background-home-biodome.svg";
import champlainBridgeImageUrl from "../../shared/assets/background-home-champlain-bridge.svg";

const gradientBackground = keyframes`
    0% {
        background-position: 0% 86%;
    }
    100% {
        background-position: 100% 15%;
    }
`;

export const OsheagaBackground: React.FunctionComponent = ({ children }) => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      background={`linear-gradient(to bottom left,
        #2e88ba 10%,
        #e66386 20%,
        #dba37c 30%,
        #fae854 60%,
        #fae854 75%,
        #3baac6 80%,
        #2e88ba 90%)`}
      backgroundSize="1600% 1600%"
      animation={`${gradientBackground} 24s linear infinite`}
    >
      <PageSlice
        fullHeight
        maxWidth="100%"
        backgroundImage={`url(${biodomeImageUrl}), url(${champlainBridgeImageUrl})`}
        backgroundRepeat="no-repeat"
        backgroundPosition="bottom left, bottom"
        backgroundSize="20rem, 100% 10rem"
      >
        {children}
      </PageSlice>
    </Box>
  );
};
