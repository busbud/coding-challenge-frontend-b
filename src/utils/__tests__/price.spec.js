import { currencyFormatter } from "../price";

describe("currencyFormatter", () => {
  it("should format value to BRL currency", () => {
    expect(currencyFormatter("400")).toBe("$400.00");
    expect(currencyFormatter("1000")).toBe("$1,000.00");
    expect(currencyFormatter("1000.90")).toBe("$1,000.90");
    expect(currencyFormatter("200400.10")).toBe("$200,400.10");
  });
});
