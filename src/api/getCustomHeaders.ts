// NOTE: Linting disabled as HTTP headers don't adhere to the
// established naming conventions
/* eslint-disable @typescript-eslint/naming-convention*/
export const getCustomHeaders = (): Record<string, string> => {
  return {
    Accept:
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": process.env.REACT_APP_BUSBUD_TOKEN || "",
  };
};
