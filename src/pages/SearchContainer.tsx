import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

type SearchProps = {
  message: string;
};

const SearchContainer = ({ message }: SearchProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        />
      </Container>
    </React.Fragment>
  );
};

export default SearchContainer;
