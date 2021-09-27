import http from './common';

class ShareNowService {
    getVehicles = () => {
        return http.get('/share-now/vehicles');
    };
}

export default new ShareNowService();
