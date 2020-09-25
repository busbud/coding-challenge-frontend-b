import React from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/core";

export default function App() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" backgroundColor="blue.600" color="white" padding="2rem">
        <Heading as="h1">
          Book a bus ticket to the Osheaga festival with Busbud!
        </Heading>
      </Box>
      <Box as="main" padding="4rem 3rem" flexGrow="1" backgroundColor="white">
        Coming soon!
      </Box>
      <Box as="footer" backgroundColor="blue.600" color="white" padding="2rem">
        <Text as="span" display="block" textAlign="end">
          Created by{" "}
          <Link href="https://github.com/CJourneaux/">Cécile Journeaux</Link>{" "}
          for{" "}
          <Link href="https://www.busbud.com/fr/jobs/senior-full-stack-developer">
            Busbud
          </Link>{" "}
          - September 2020
        </Text>
      </Box>
    </Flex>
  );
}
