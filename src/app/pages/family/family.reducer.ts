import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';
import { BirdFamilyState, BirdFamily } from '../../models/bird-family';

const initState: BirdFamilyState = {
  families: [] as BirdFamily[],
  familyDetail: {} as BirdFamily,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const familyReducer = (state = initState, action: RootAction): BirdFamilyState => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_FAMILY:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case ACTION_TYPES.GET_ALL_FAMILY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        families: action.payload,
      };

    case ACTION_TYPES.GET_ALL_FAMILY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    case ACTION_TYPES.GET_FAMILY:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case ACTION_TYPES.GET_FAMILY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        familyDetail: action.payload,
      };

    case ACTION_TYPES.GET_FAMILY_FAILURE:
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
