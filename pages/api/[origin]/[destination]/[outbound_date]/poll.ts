import type { NextApiRequest, NextApiResponse } from 'next';

import { SearchResponse } from 'domains/search';

import { api } from 'client';

type PollError = {
  description: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | PollError>,
) {
  const {
    origin,
    destination,
    outbound_date: outboundDate,
    adult,
  } = req.query;

  if (typeof origin !== 'string'
    || typeof destination !== 'string'
    || typeof outboundDate !== 'string'
    || typeof adult !== 'string'
  ) {
    res.status(500).json({ description: 'Invalid search filters' });
    return;
  }

  const { data } = await api.get<
    SearchResponse
  >(`/x-departures/${origin}/${destination}/${outboundDate}/poll?adult=${adult}`);

  res.status(200).json(data);
}
