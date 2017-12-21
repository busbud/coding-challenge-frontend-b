class API {
  constructor () {
    this.baseUrl = 'https://napi.busbud.com';
    this.headers = new Headers({
      'Accept' : 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token' : 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    });
  }

  serialize (obj) {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  fetch (path, query = {}, method = 'GET') {
    let url = `${this.baseUrl}${path}`;
    let q = this.serialize(query);
    if (q) {
      url += `?${q}`;
    }
    let request = new Request(url, {
      headers : this.headers,
      method
    });

    return fetch(request);
  }

  departures (origin, destination, outboundDate, query = {}) {
    let path = `/x-departures/${origin}/${destination}/${outboundDate}`;
    return {
      get : () => {
        return this.fetch(path, query);
      },
      poll : () => {
        return this.fetch(`${path}/poll`, query);
      }
    };
  }
}

export default API;
