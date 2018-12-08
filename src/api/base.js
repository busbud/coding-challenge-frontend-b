import axios from 'axios';

import { base } from './conf';

/** Base class to create an API call. */
export default class BaseAPI {

  /**
   * Create a new instance of axios with a custom config
   */
  constructor() {
    this.axios = axios.create({
      baseURL: base.url,
      headers: base.headers
    });
  }

  /**
   * Launch a GET call against Busbud API
   */
  async get(url, params) {
    try {
      const {data} = await this.axios.get(url, {params});
      return data;
    } catch (e) {
      console.error("Unable to call " + url, e);
      throw (e);
    }
  }

}
