import React from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/core";

import busbudLogoUrl from "../assets/logo-busbud-blue.png";
import { PageSlice } from "./page-slice";
import { ImageAsText } from "./image-as-text";

type PageLayoutProps = {};
export const PageLayout: React.FunctionComponent<PageLayoutProps> = ({
  children,
}) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <PageSlice
        fullWidth
        as="header"
        backgroundColor="pink.700"
        color="white"
        padding={["1rem 2rem", "3rem"]}
      >
        <Heading as="h1" textAlign="center">
          Book your bus ticket to the{" "}
          <ImageAsText
            text="Osheaga"
            imageUrl="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
          />{" "}
          festival with <ImageAsText text="Busbud" imageUrl={busbudLogoUrl} /> !
        </Heading>
      </PageSlice>
      <Box as="main" flexGrow={1} display="flex" flexDirection="column">
        {children}
      </Box>
      <PageSlice
        as="footer"
        padding="3rem"
        backgroundColor="blue.600"
        color="white"
      >
        <Text as="span" display="block" textAlign="end">
          Created by{" "}
          <Link href="https://github.com/CJourneaux/">Cécile Journeaux</Link>{" "}
          for{" "}
          <Link href="https://www.busbud.com/fr/jobs/senior-full-stack-developer">
            Busbud
          </Link>{" "}
          - September 2020
        </Text>
      </PageSlice>
    </Flex>
  );
};
