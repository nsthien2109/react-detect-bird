import { BirdStatus } from './bird-status';
import { BirdFamily } from './bird-family';
import { BirdOrder } from './bird-order';
export interface Bird {
  id: number;
  common_name: string;
  vietnamese_name: string;
  scientific_name: string;
  bird_order: string;
  description: string;
  distribution: string;
  diet: string;
  status?: BirdStatus;
  order?: BirdOrder;
  family?: BirdFamily;
  class_name: string;
  images: string[];
}

export interface BirdState {
  birds: Bird[];
  birdDetail: Bird;
  currentPage: number;
  totalPages: number;
  totalItem: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
