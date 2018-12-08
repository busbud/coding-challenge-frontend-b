import { search, searchParams } from './conf';
import BaseAPI from './base';

/** Class to initialize search and poll results. */
export default class Search extends BaseAPI {

  /**
   * Set up a boolean to know if search has been initialized
   */
  constructor(params={}) {
    super();
    // Boolean to store if a search has already been initialized
    this.searchInitialized = false;
    // Querystring parameters for search requests
    this.searchParams = {
      ...searchParams,
      ...params
    }
  }

  /**
   * Return Busbud URL to query
   */
  getURL() {
    let params = [
      'x-departures',
      search.origin,
      search.destination,
      search.date
    ]
    if (this.searchInitialized) {
      params.push("poll");
    }
    return params.join('/');
  }

  /**
   * Initialize a search
   */
  async initialize() {
    const url = this.getURL();
    const data = await this.get(url, this.searchParams);
    this.searchInitialized = true;
    return data;
  }

  /**
   * Poll results
   */
  async poll(index) {
    if (!this.searchInitialized) {
      throw new Error('A search should have been previously initialized.');
    }
    const url = this.getURL();
    const params = {
      ...this.searchParams,
      index
    }
    const data = await this.get(url, params);
    return data;
  }

}
