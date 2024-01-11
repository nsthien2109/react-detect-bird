import { ApiService } from '.';
import { ENDPOINT } from '../constants';

// get all of family
export const getFamilies = () => {
  const api = new ApiService();
  return api.get(ENDPOINT.families.index);
};

// get family by id
export const getFamily = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.families.index}/${id}`);
};
