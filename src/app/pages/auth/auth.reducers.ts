import { AuthState, UserInfo } from '../../models';
import { StorageKey } from '../../shared/constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../shared/utils';
import { RootAction } from '../../store/store';
import { ACTION_TYPES } from '../../store/types';

const initState: AuthState = {
  userInfo: getLocalStorage(StorageKey.ACCOUNT, {} as UserInfo) || {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const authReducer = (state = initState, action: RootAction): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }
    case ACTION_TYPES.LOGIN_SUCCESS: {
      setLocalStorage(StorageKey.ACCOUNT, action.payload?.data);
      setLocalStorage(StorageKey.ACCESS_TOKEN, action.payload.accessToken);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userInfo: action.payload.data,
      };
    }
    case ACTION_TYPES.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPES.LOGOUT_SUCCESS: {
      removeLocalStorage(StorageKey.ACCESS_TOKEN);
      removeLocalStorage(StorageKey.ACCOUNT);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userInfo: {} as UserInfo,
        isError: false,
      };
    }

    case ACTION_TYPES.LOGOUT_FAILURE: {
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
