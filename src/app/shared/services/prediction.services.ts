import { ApiService } from '.';
import { ENDPOINT } from '../constants';

export const prediction = (data: FormData) => {
  const api = new ApiService();
  return api.post(ENDPOINT.prediction.index, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
