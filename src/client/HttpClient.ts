const API_BASE_URL = 'https://napi.busbud.com';
const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
};

class HttpClient {
  private static API_BASE_URL = API_BASE_URL;
  private static headers: { [key: string]: string } = BASE_HEADERS;

  public static async get(path: string): Promise<any> {
    // eslint-disable-next-line no-undef
    const response = await fetch(`${this.API_BASE_URL}${path}`, {
      method: 'GET',
      // mode: 'cors',
      headers: {
        ...this.headers,
      },
    });
    return await response.json();
  }
}

export default HttpClient;
