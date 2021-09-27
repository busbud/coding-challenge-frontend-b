import http from './common';

class FreeNowService {
    getTaxis = () => {
        return http.get('/free-now/vehicles');
    };
}

export default new FreeNowService();
