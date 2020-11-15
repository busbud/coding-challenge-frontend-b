export type TCityForSelection = {
  geohash: string;
  name: string;
};
export type TCityReducerState = {
  data: TCityForSelection[];
  error?: Error;
  loading: boolean;
  loaded: boolean;
};
