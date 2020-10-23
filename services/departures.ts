import { Departure } from '@/store/departures/state';
import { Operator } from '@/store/operators/state';
import axios from '@/utils/axios';

const today = new Date();
const afterWeek = new Date(new Date().setDate(today.getDate() + 7));
export const QUEBEC_GEOHASH = 'f2m673';
export const MONTREAL_GEOHASH = 'f25dvk';
export const DEFAULT_DATE_STRING = afterWeek.toISOString().split('T')[0];

type DeparturesResponse = {
  departures: Departure[];
  operators: Operator[];
};

const queryPool = (poolUrl: string): Promise<DeparturesResponse> =>
  new Promise((resolve, reject) => {
    try {
      const interval = setInterval(async () => {
        const {
          data: { departures, complete, operators },
        } = await axios.get(poolUrl);

        if (complete) {
          clearInterval(interval);
          resolve({ departures, operators });
        }
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });

export const getDepartures = async ({
  from = QUEBEC_GEOHASH,
  destination = MONTREAL_GEOHASH,
  departureDate = DEFAULT_DATE_STRING,
} = {}): Promise<DeparturesResponse> => {
  const {
    data: { departures, complete, operators },
  } = await axios.get(`/x-departures/${from}/${destination}/${departureDate}`, {
    params: { adult: 1 },
  });

  if (complete) return { departures, operators };

  return queryPool(
    `/x-departures/${from}/${destination}/${departureDate}/poll`
  );
};
