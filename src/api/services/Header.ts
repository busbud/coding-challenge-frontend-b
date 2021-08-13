export default class Header {
  static Build() {
    class Build {
      headers = {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
      };

      get() {
        return this.headers;
      }
    }

    return new Build();
  }
}
