export const isProduction = process.env.NODE_ENV === "production";

if (typeof process.env.PORT !== "string") {
  throw Error("Missing environment variable PORT");
}
export const serverPort = process.env.PORT;

if (typeof process.env.BUSBUD_TOKEN !== "string") {
  throw Error("Missing environment variable BUSBUD_TOKEN");
}
export const busbudToken = process.env.BUSBUD_TOKEN;
