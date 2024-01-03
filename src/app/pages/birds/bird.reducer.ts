import {Bird, BirdState} from '../../models/bird';
import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';

const initState: BirdState = {

  birds: [],
  birdDetail : {} as Bird,
  pageSize : 0,
  totalItem : 0,
  totalPages : 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const birdReducer = (state = initState, action: RootAction): BirdState => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_BIRD: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }

    case ACTION_TYPES.GET_ALL_BIRD_SUCCESS: {
      return {
        ...state,
        birds: action.payload.data,
        currentPage: action.payload.page,
        pageSize : action.payload.pageSize,
        totalPages : action.payload.totalPages,
        totalItem : action.payload.total,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    }

    case ACTION_TYPES.GET_ALL_BIRD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    case  ACTION_TYPES.GET_BIRD : {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      }
    }

    case  ACTION_TYPES.GET_BIRD_SUCCESS : {
      return {
        ...state,
        birdDetail: action.payload,
        isLoading: false,
        isSuccess: true,
        message: '',
      }
    }

    case  ACTION_TYPES.GET_BIRD_FAILURE : {
      return  {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      }
    }

    default:
      return state;
  }
};
