import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SearchState {
  adult: number;
  child: number;
  senior: number;
}

const initialState: SearchState = {
  adult: 4,
  child: 0,
  senior: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchData: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: string; value: number }>
    ) => ({
      ...state,
      [name]: +value >= 0 ? +value : 0,
    }),
  },
});

export const { updateSearchData } = searchSlice.actions;
export default searchSlice.reducer;

export const searchSelector = ({ search }: RootState): RootState["search"] =>
  search;
