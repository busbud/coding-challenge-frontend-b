import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

type PageLayoutProps = BoxProps & {
  fullWidth?: boolean;
  fullHeight?: boolean;
};

export const PageSlice: React.FunctionComponent<PageLayoutProps> = ({
  fullWidth = false,
  fullHeight = false,
  children,
  ...props
}) => {
  const innerWrapperProps = fullWidth
    ? { width: "100%" }
    : { maxWidth: "64rem" };
  return (
    <Box padding="1.5rem" flexGrow={fullHeight ? 1 : 0} {...props}>
      <Box margin="auto" {...innerWrapperProps}>
        {children}
      </Box>
    </Box>
  );
};
