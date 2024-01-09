export interface BirdOrder {
  id: number;
  orderName: string;
  orderVietnameseName?: string;
}

export interface BirdOrderState {
  orders: BirdOrder[];
  orderDetail: BirdOrder;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
