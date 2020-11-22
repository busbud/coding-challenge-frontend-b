import { getTickets } from './../api/busbud';
import { setTickets } from './search/slice';

export const getTicketsHandler = (
  origin: string,
  destination: string,
  outboundDate: string,
  adult: number
) => (dispatch: any) => {
  return getTickets(origin, destination, outboundDate, adult).then((res) => {
    dispatch(setTickets(res.data));
  });
};
