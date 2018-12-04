import axios from 'axios';

export default class Core {

  constructor(customConfig) {
    this.axios = axios.create({
      baseURL: 'https://napi.busbud.com',
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
      },
      ...customConfig
    });
  }

  async get(url, params) {
    try {
      const {data} = await this.axios(url, {
        params
      });

      return data;
    } catch (e) {
      console.error(e, `${url} can not get data`);
      throw (e);
    }
  }

}
