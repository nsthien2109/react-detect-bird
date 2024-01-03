import { Dispatch } from 'react';
import { ACTION_TYPES } from '../../store/types';
import { RootAction } from '../../store/store';
import { login } from '../../shared/services/auth.services';
import { message } from 'antd';

export const loginStart = () => {
  return {
    type: ACTION_TYPES.LOGIN,
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = (error: string) => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
    payload: error,
  };
};

export const logoutStart = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: ACTION_TYPES.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error: string) => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
    payload: error,
  };
};

export const loginAction = (email: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(loginStart());
  try {
    const data = await login({ email, password });
    dispatch(loginSuccess(data));
    message.open({
      type: 'success',
      content: 'Login successfully',
    });
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Some things went wrong !`,
    });
  }
};

export const logoutAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    message.open({
      type: 'success',
      content: 'Logout successfully',
    });
  } catch (error) {
    dispatch(logoutFailure('Logout failure'));
    message.open({
      type: 'error',
      content: `Logout failure !`,
    });
  }
};
