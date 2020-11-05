export default {
  APIs: {
    busbud: {
      api: 'https://napi.busbud.com/x-departures',
      'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA',
    },
    spotify: {
      api: 'https://api.spotify.com/v1/playlists/6YNjFHv84Wr6HSAw10xzct/tracks?market=BE&limit=100',
      token: 'Bearer BQC6y-dCECukZaojXLGkM0liRZ1x85si_Ql0PH2nv3aRRke7DwDpBT8d2tNUdDYZWNNSK8NUMMxuDrWbee2Y7lxI8hMaLdo6YUXm95QiXBRUmRbnVZ2VYxdnrhlodb0JVibE7G_t-QzzhGcjtHXuTcTwNrrlSw',
    },
  },
  originCity: {
    name: 'Québec',
    geohash: 'f2m673',
  },
  destinationCity: {
    name: 'Montréal',
    geohash: 'f25dvk',
  },
  defaultSearchDate: '2020-12-01',
  festivalTicketPrices: {
    basic: 333.50,
    gold: 608.50,
    platinum: 1258.50,
  },
};
