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
        <picture>
          <source
            srcSet={
              Object {
                "process": [Function],
              }
            }
            type="image/webp"
          />
          <source
            srcSet={
              Object {
                "process": [Function],
              }
            }
          />
          <img
            alt="osheaga"
            className="osheaga"
            src={
              Object {
                "process": [Function],
              }
            }
            webp={
              Object {
                "process": [Function],
              }
            }
          />
        </picture>
        <p>
          avec
        </p>
        <picture>
          <source
            srcSet={
              Object {
                "process": [Function],
              }
            }
            type="image/webp"
          />
          <source
            srcSet={
              Object {
                "process": [Function],
              }
            }
          />
          <img
            alt="Logo"
            className="logo"
            src={
              Object {
                "process": [Function],
              }
            }
            webp={
              Object {
                "process": [Function],
              }
            }
          />
        </picture>
      </header>
    `);
  });
});
