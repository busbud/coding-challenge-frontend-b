import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("expect to render App component", () => {
  const mockOrigin = "abc123";
  expect(shallow(<App origin={mockOrigin} />).debug()).toMatchSnapshot();
});
