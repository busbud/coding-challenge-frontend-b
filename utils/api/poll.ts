import { busBudApi } from '../fetchClient';
import { PollParams } from '../../interfaces';
import { Search } from '../../interfaces/response';

const poll = async ({
    departure,
    destination,
    date,
    adult = '1',
    child = '0',
    senior = '0',
    lang = 'en',
    currency = 'CAD',
    index = 0,
}: PollParams):  Promise<Search> => {
    const uri = `/x-departures/${departure}/${destination}/${date}/poll`;
    const query = { adult, child, senior, lang, currency, index };
    const { parsedBody }  = await busBudApi<Search>({ uri, query });
    return parsedBody;
};

export default poll;