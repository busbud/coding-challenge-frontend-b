import Header from './Header';
import { ResponseHandler } from '../ResponseHandler';
import { ISearchResponseDTO } from '../dtos/ISearchResponseDTO';

const RUNTIME_ENDPOINT = 'https://napi.busbud.com';

export default class BusServices {
  static search = async ({
    departure,
    destination,
    date,
    index = 0,
    numberPeople = 0,
  }: any): Promise<ISearchResponseDTO> => {
    const res = await fetch(
      `${RUNTIME_ENDPOINT}/x-departures/${departure}/${destination}/${date}?` +
        new URLSearchParams({
          lang: 'en',
          currency: 'USD',
          adult: numberPeople,
          child: '0',
          senior: '0',
          index,
        }),
      {
        method: 'GET',
        headers: Header.Build().get(),
      },
    );

    return ResponseHandler(res);
  };
}
