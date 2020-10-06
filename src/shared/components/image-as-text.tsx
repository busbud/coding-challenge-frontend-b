import React from "react";
import { Box } from "@chakra-ui/core";

type ImageAsTextProps = {
  text: string;
  imageUrl: string;
};

export const ImageAsText: React.FunctionComponent<ImageAsTextProps> = ({
  text,
  imageUrl,
  ...props
}) => {
  return (
    <Box
      as="span"
      backgroundImage={`url("${imageUrl}")`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="bottom"
      color="transparent"
      {...props}
    >
      {text}
    </Box>
  );
};
