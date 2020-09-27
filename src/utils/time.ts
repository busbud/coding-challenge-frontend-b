import moment from "moment-timezone";
import humanizeDuration from "humanize-duration";

export const toLocalTime = (
  wallclockTime: string,
  ianaRegion: string
): string => {
  return moment.tz(wallclockTime, ianaRegion).format("h:mm A");
};

export const humanize = (mins: number, langCode: string): string => {
  const ms = mins * 60000;
  return humanizeDuration(ms, {
    language: langCode,
    delimiter: " ",
    fallbacks: ["en"],
  });
};
