import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';
import { BirdStatusState, BirdStatus } from '../../models/bird-status';

const initState: BirdStatusState = {
  status: [] as BirdStatus[],
  statusDetail: {} as BirdStatus,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const statusReducer = (state = initState, action: RootAction): BirdStatusState => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_STATUS:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case ACTION_TYPES.GET_ALL_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        status: action.payload,
      };

    case ACTION_TYPES.GET_ALL_STATUS_FAILURE:
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
