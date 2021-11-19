export type City = {
  id: string;
  label: string;
};

export type SearchParams = {
  departure: string;
  destination: string;
  date: string;
  adult?: string;
  child?: string;
  senior?: string;
  lang?: string;
  currency?: string;
};

export type PollParams = SearchParams & {
  index: number;
};

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}