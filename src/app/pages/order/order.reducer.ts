import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';
import { BirdOrderState, BirdOrder } from '../../models/bird-order';

const initState: BirdOrderState = {
  orders: [] as BirdOrder[],
  orderDetail: {} as BirdOrder,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const orderReducer = (state = initState, action: RootAction): BirdOrderState => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_ORDER:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case ACTION_TYPES.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload,
      };

    case ACTION_TYPES.GET_ALL_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    default:
      return state;
  }
};
