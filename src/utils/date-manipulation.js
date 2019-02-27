export const getAmPmTime = isoDate => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const stringHours = hours % 12;
  const stringMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const abbr = hours > 12 ? 'pm' : 'am';

  return `${stringHours === 0 ? '12' : stringHours}:${stringMinutes} ${abbr}`;
};
