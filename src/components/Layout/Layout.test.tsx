import React from "react";
import { render } from "../../test-utils";
import Layout from "./Layout";

describe("<Layout />", () => {
  it("should render the Container component", () => {
    const { baseElement } = render(
      <Layout>
        <span>This is a test</span>
      </Layout>
    );

    expect(baseElement).toBeTruthy();
  });
});
