import { Bird } from './bird';

export interface BirdOrder {
  id: number;
  orderName: string;
  orderVietnameseName?: string;
  birds: Bird[];
}

export interface BirdOrderState {
  orders: BirdOrder[];
  orderDetail: BirdOrder;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
