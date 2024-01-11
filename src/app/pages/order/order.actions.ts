import { ACTION_TYPES } from '../../store/types';
import { Dispatch } from 'react';
import { RootAction } from '../../store/store';

import { message } from 'antd';
import { getOrder, getOrders } from '../../shared/services/order.services';
import { BirdOrder } from '../../models/bird-order';

const getAllOrder = () => {
  return {
    type: ACTION_TYPES.GET_ALL_ORDER,
  };
};

const getAllOrderSuccess = (data: BirdOrder[]) => {
  return {
    type: ACTION_TYPES.GET_ALL_ORDER_SUCCESS,
    payload: data,
  };
};

const getAllOrderFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ALL_ORDER_FAILURE,
    payload: message,
  };
};

const getOrderStart = () => {
  return {
    type: ACTION_TYPES.GET_ORDER,
  };
};

const getOrderSuccess = (data: BirdOrder) => {
  return {
    type: ACTION_TYPES.GET_ORDER_SUCCESS,
    payload: data,
  };
};

const getOrderFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ORDER_FAILURE,
    payload: message,
  };
};

export const getAllOrderAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getAllOrder());
  try {
    const data: any = await getOrders();
    dispatch(getAllOrderSuccess(data));
  } catch (error) {
    dispatch(getAllOrderFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get orders, please try again !`,
    });
  }
};

export const getOrderAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getOrderStart());
  try {
    const data: any = await getOrder(id);
    dispatch(getOrderSuccess(data));
  } catch (error) {
    dispatch(getOrderFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get order, please try again !`,
    });
  }
};
