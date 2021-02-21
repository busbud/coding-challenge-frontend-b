import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export function formatTime(dateString: string) {
  try {
    const formatted = format(parseISO(dateString), "p");
    return formatted;
  } catch (error) {
    console.log(error);
  }
  return "";
}

export function formatDate(dateString: string) {
  try {
    const formatted = format(parseISO(dateString), "EEEE, MMMM do y");
    return formatted;
  } catch (error) {
    console.log(error);
  }
  return "";
}

export function formatCents(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
