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
  const fullDate = new Date(date);
  const hours = fullDate.getUTCHours();
  const minutes = fullDate.getUTCMinutes();
  return `${hours}:${minutes}`;
}
