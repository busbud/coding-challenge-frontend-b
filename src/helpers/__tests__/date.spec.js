import { formattedDate } from "../date";

describe("formattedDate", () => {
  it("should format a datetime input", () => {
    expect(formattedDate("2021-01-30T12:45:00")).toBe(
      "Sat, January 30 - 12:45 pm"
    );
  });
});
