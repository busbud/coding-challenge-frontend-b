export const base = {
  /**
   * Busbud production API
   */
  url: 'https://napi.busbud.com',

  /**
   * Busbud API call headers
   */
  headers: {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
  }
}

export const search = {
  /**
   * Origin's geohash
   */
  origin: 'dr5reg',

  /**
   * Destination's geohash
   */
  destination: 'f25dvk',

  /**
   * ISO 8601 Outbound departure date
   */
  date: '2019-08-02'
}

export const searchParams = {
  /**
   * Number of adults
   */
  adult: 1,

  /**
   * Number of childrens
   */
  child: 0,

  /**
   * Number of senior
   */
  senior: 0
}