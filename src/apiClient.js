import superagent from 'superagent';

export default class ApiClient {
    makeRequest = (method, path, { query, body } = {}) =>
        new Promise((resolve, reject) => {
            const request = superagent[method](path)
                .set('X-Busbud-Token', 'PARTNER_AHm3M6clSAOoyJg4KyCg7w')
                .set('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/');

            if (query) {
                request.query(query);
            }

            if (body) {
                request.send(body);
            }

            request.end((err, res = {}) => (
                err ? reject(res.body || err) : resolve(res.body)
            ));
        });

    get = this.makeRequest.bind(this, 'get');

    post = this.makeRequest.bind(this, 'post');

    put = this.makeRequest.bind(this, 'put');

    patch = this.makeRequest.bind(this, 'patch');

    del = this.makeRequest.bind(this, 'del');
}
