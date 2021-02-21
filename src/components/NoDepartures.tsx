import { formatDate } from "../utils";

export default function NoDepartures({ resultDate }: { resultDate: string }) {
  return (
    <p className="results-title">
      No departures found for <strong>{formatDate(resultDate)}</strong>
    </p>
  );
}
