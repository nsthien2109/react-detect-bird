import { ApiService } from '.';
import { ENDPOINT } from '../constants';

export const getStats = () => {
    const api = new ApiService();
    return api.get(ENDPOINT.stats.index);
};
