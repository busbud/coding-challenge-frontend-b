export const busbudAcceptHeader: string = "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/";
export const busbudTokenHeader: string = process.env.VUE_APP_BUSBUD_TOKEN as string;

export const apiRequestHeader = {
    Accept: busbudAcceptHeader,
    "X-Busbud-Token": busbudTokenHeader,
};