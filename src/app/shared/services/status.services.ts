import { ApiService } from '.';
import { ENDPOINT } from '../constants';

// get status of all user
export const getStatus = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.status.index);
};

// get status by id
export const getStatusById = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.status.index}/${id}`);
};
