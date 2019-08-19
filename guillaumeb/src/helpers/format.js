import moment from 'moment';

export function formatMoney(amount) {
  const options = {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-CA', options);
  return formatter.format(amount / 100);
}

export function formatDate(date) {
  const day = new Date(date);
  return moment(day).format('HH:MM');
}

export function sortByDate(a, b) {
  if (a.departure_time < b.departure_time) {
    return -1;
  }
  if (a.departure_time > b.departure_time) {
    return 1;
  }
  return 0;
}
