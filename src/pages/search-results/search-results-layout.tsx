import { Box, Divider, Flex } from "@chakra-ui/core";
import React from "react";
import { PageSlice } from "../../shared/components";
import { SearchForm } from "./search-form";

type SearchResultsLayoutProps = {
  aside?: React.ReactNode;
};
export const SearchResultsLayout: React.FunctionComponent<SearchResultsLayoutProps> = ({
  aside,
  children,
}) => {
  return (
    <>
      <PageSlice fullWidth>
        <SearchForm />
      </PageSlice>
      <PageSlice>
        <Flex flexDirection={{ _: "column", lg: "row" }}>
          {aside && (
            <>
              <Box
                as="aside"
                width={{ _: "100%", lg: "20rem" }}
                margin={{ _: "0 0 1.5rem 0", lg: "0 1.5rem 0 0" }}
              >
                {aside}
              </Box>
            </>
          )}
          <Box flexGrow={1}>{children}</Box>
        </Flex>
      </PageSlice>
    </>
  );
};
