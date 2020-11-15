import { TCurrency } from "./Currency";
import { TLang } from "./Lang";
export type TScheduleDepartureRequest = {
  origin: string;
  destination: string;
  outboundDate: string;
  adultTickets: number;
  childTickets: number;
  seniorTickets: number;
  // NOTE: whitelisting the known languages for the time being
  lang: TLang;
  // NOTE: whitelisting the known currencies for the time being
  currency: TCurrency;
};
