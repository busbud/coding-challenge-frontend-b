import { busBudApi } from '../fetchClient';
import { SearchParams } from '../../interfaces';
import { Search } from '../../interfaces/response';

const search = async ({
    departure,
    destination,
    date,
    adult = '1',
    child = '0',
    senior = '0',
    lang = 'en',
    currency = 'CAD',
}: SearchParams): Promise<Search> => {
    const uri = `/x-departures/${departure}/${destination}/${date}`;
    const query = { adult, child, senior, lang, currency };
    const { parsedBody } = await busBudApi<Search>({ uri, query });
    return parsedBody;
};

export default search;