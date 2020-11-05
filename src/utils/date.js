export function dateToHHmm(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(' ')[0];
}

export default null;
