import React, { Component, createContext } from "react";

import { Backdrop, CircularProgress } from "@material-ui/core";

export const SpinnerContext = createContext();

class SpinnerContextProvider extends Component {
  state = {
    spinner: false,
  };
  showSpinner = (value) => {
    this.setState({
      spinner: value,
    });
  };
  render() {
    return (
      <SpinnerContext.Provider
        value={{
          showSpinner: this.showSpinner,
        }}
      >
        <Backdrop
          style={{ zIndex: "999", background: "transparent" }}
          open={this.state.spinner}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        {this.props.children}
      </SpinnerContext.Provider>
    );
  }
}

export default SpinnerContextProvider;
