import { AxiosResponse } from "axios";
import Config from "../config";
import { RootState } from "../redux/store";
import { TicketsDTOOutput } from "./types/busbud";
import { busbudAxiosInstance } from "./axios";

const {
  GEOHASH: { QUEBEC, MONTREAL },
  OSHEAGA_EVENT_ISO_DATE,
} = Config;

export function getDeparturesFromQuebecToMontreal(
  search: RootState["search"]
): Promise<AxiosResponse<TicketsDTOOutput>> {
  return busbudAxiosInstance.get<TicketsDTOOutput>(
    `/x-departures/${QUEBEC}/${MONTREAL}/${OSHEAGA_EVENT_ISO_DATE}`,
    { params: { ...search } }
  );
}

export function getDeparturesFromQuebecToMontrealPoll(
  search: RootState["search"],
  index: number
): Promise<AxiosResponse<TicketsDTOOutput>> {
  return busbudAxiosInstance.get<TicketsDTOOutput>(
    `/x-departures/${QUEBEC}/${MONTREAL}/${OSHEAGA_EVENT_ISO_DATE}/poll`,
    { params: { ...search, index } }
  );
}
