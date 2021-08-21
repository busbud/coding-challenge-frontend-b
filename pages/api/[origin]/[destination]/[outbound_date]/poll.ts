import type { NextApiRequest, NextApiResponse } from 'next';

import { Search } from 'domains/search';

type Data = {
  name: string
}

type PollError = {
  description: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | PollError>,
) {
  const { origin, destination, outbound_date: outboundDate } = req.query;

  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof outboundDate !== 'string') {
    res.status(500).json({ description: 'Invalid search filters' });
    return;
  }

  const response = await Search.getSSRDeparturesPoll(origin, destination, outboundDate);
  res.status(200).json(response.data);
}
