import moment from "moment";

export function formatTime(time) {
  return moment(time).format("HH:mm");
}

export function formatPrice(number) {
  let str = number.toString();

  if (str.length > 2) {
    str = str.substr(0, str.length - 2) + "." + str.substr(str.length - 2, 2);
  }
  return str;
}
