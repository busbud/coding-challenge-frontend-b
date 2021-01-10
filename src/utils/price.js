export const currencyFormatter = (price) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    price
  );

export default {
  currencyFormatter,
};
