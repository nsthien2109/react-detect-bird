import { ApiService } from '.';
import { ENDPOINT } from '../constants';

// get histories of all user
export const getHistories = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.histories.index);
};

// get history it self
export const getHistory = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.histories.personal);
};

// delete history
export const deleteHistory = (id: number) => {
  const api = new ApiService();
  return api.delete(`${ENDPOINT.histories.index}/${id}`);
};
