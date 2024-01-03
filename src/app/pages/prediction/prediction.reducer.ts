import { PredictionState } from '../../models/prediction';
import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';

const initState: PredictionState = {
  predictions: [],
  history: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const predictionReducer = (state = initState, action: RootAction): PredictionState => {
  switch (action.type) {
    case ACTION_TYPES.PREDICTION_BIRD: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }
    case ACTION_TYPES.PREDICTION_BIRD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        predictions: action.payload,
      };
    }
    case ACTION_TYPES.PREDICTION_BIRD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    case ACTION_TYPES.GET_HISTORY: {
      return {
        ...state,
        history: [],
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }

    case ACTION_TYPES.GET_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        history: action.payload,
      };
    }

    case ACTION_TYPES.GET_HISTORY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    case ACTION_TYPES.DELETE_HISTORY: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }

    case ACTION_TYPES.DELETE_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        history: state.history.filter((item) => item.id !== action.payload),
      };
    }

    case ACTION_TYPES.DELETE_HISTORY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
