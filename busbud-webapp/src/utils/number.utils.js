export const formatCurrency = (number, currency) => {
    const formatter = new Intl.NumberFormat([], { style: 'currency', currency: currency });
    return formatter.format(number);
};
