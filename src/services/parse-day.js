const searchDayRegex = /day=\d{4}-\d{2}-\d{2}/;
const dayRegex = /\d{4}-\d{2}-\d{2}/;

export function parseDay(search) {
  if (!searchDayRegex.test(search)) {
    return '2019-08-02';
  }
  return dayRegex.exec(search)[0];
}
