import { createSlice } from '@reduxjs/toolkit';

interface SetTicketsAction {
  tickets: any[];
}

const searchSlice = createSlice({
  name: 'users',
  initialState: {
    tickets: []
  },
  reducers: {
    setTickets: (state, action: any) =>
      Object.assign(state, { tickets: action.payload })
  }
});

export const { setTickets } = searchSlice.actions;

export default searchSlice.reducer;
