import { ApiService } from '.';
import { ENDPOINT } from '../constants';

export const getBirds = (page : number) => {
  const api = new ApiService();
  return api.get(ENDPOINT.birds.index, {page});
};

export const getBirdData = (birdId : number) => {
  const api  = new ApiService();
  return api.get(`${ENDPOINT.birds.index}/${birdId}`)
}