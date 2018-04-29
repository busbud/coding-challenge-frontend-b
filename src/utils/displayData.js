import moment from 'moment';

export const displayISOTime = (time) => {
  return moment(time).format('dddd, MMMM Do YYYY, HH:mm');
};

export const displayPrice = (price) => {
  if (price < 100) { return '<$1 USD'; }

  const pString = String(price);
  return `$${pString.slice(0, -2)}.${pString.slice(-2)} USD`;
};

export const displayAddressAry = (address) => {
  return address.join(',\n');
};
