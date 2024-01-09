import { ApiService } from '.';
import { ENDPOINT } from '../constants';

// get all of order
export const getOrders = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.order.index);
};

// get family by id
export const getOrder = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.order.index}/${id}`);
};
