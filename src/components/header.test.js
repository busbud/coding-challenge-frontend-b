import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.js";

describe("<Header /> component", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <header
        className="header"
      >
        <img
          alt="osheaga"
          className="osheaga"
          src={
            Object {
              "process": [Function],
            }
          }
        />
        <p>
          avec
        </p>
        <img
          alt="Logo"
          className="logo"
          src={
            Object {
              "process": [Function],
            }
          }
        />
      </header>
    `);
  });
});
