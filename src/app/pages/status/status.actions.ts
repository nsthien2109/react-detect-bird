import { ACTION_TYPES } from '../../store/types';
import { BirdStatus } from '../../models/bird-status';
import { Dispatch } from 'react';
import { RootAction } from '../../store/store';

import { getStatus, getStatusById } from '../../shared/services/status.services';
import { message } from 'antd';

const getAllStatus = () => {
  return {
    type: ACTION_TYPES.GET_ALL_STATUS,
  };
};

const getAllStatusSuccess = (data: BirdStatus[]) => {
  return {
    type: ACTION_TYPES.GET_ALL_STATUS_SUCCESS,
    payload: data,
  };
};

const getAllStatusFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ALL_STATUS_FAILURE,
    payload: message,
  };
};

const getStatusStart = () => {
  return {
    type: ACTION_TYPES.GET_STATUS,
  };
};

const getStatusSuccess = (data: BirdStatus) => {
  return {
    type: ACTION_TYPES.GET_STATUS_SUCCESS,
    payload: data,
  };
};

const getStatusFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_STATUS_FAILURE,
    payload: message,
  };
};

export const getAllStatusAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getAllStatus());
  try {
    const data: any = await getStatus();
    dispatch(getAllStatusSuccess(data));
  } catch (error) {
    dispatch(getAllStatusFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get status, please try again !`,
    });
  }
};

export const getStatusAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getStatusStart());
  try {
    const data: any = await getStatusById(id);
    dispatch(getStatusSuccess(data));
  } catch (error) {
    dispatch(getStatusFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get order, please try again !`,
    });
  }
};
