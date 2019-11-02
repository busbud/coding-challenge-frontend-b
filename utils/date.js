export const formatedDate = (dateStr) => {
  const date = new Date(dateStr);
  // need to pass local in url or save on server
  return date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}
export const formatedTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
export const findDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  var msec = endDate - startDate;
  var mins = Math.floor(msec / 60000);
  var hrs = Math.floor(mins / 60);
  return { mins: mins % 60, hrs };
}