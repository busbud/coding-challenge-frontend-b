import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export function formatTime(dateString: string) {
  return format(parseISO(dateString), "p");
}

export function formatDate(dateString: string) {
  return format(parseISO(dateString), "EEEE, MMMM do y");
}

export function formatCents(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
