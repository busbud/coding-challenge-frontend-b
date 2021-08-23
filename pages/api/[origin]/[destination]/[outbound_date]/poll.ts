import type { NextApiRequest, NextApiResponse } from 'next';

import { Search, SearchResponse } from 'domains/search';

type PollError = {
  description: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | PollError>,
) {
  const { origin, destination, outbound_date: outboundDate } = req.query;

  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof outboundDate !== 'string') {
    res.status(500).json({ description: 'Invalid search filters' });
    return;
  }

  const data = await Search.getSSRDeparturesPoll(origin, destination, outboundDate);
  res.status(200).json(data);
}
