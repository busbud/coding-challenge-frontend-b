import moment from "moment";

export function formattedDate(datetime) {
  return moment(datetime).format("ddd, MMMM DD - h:mm a");
}
