import { ACTION_TYPES } from '../../store/types';
import { Dispatch } from 'react';
import { RootAction } from '../../store/store';

import { message } from 'antd';
import { getFamilies, getFamily } from '../../shared/services/family.services';
import { BirdFamily } from '../../models/bird-family';

const getAllFamily = () => {
  return {
    type: ACTION_TYPES.GET_ALL_FAMILY,
  };
};

const getAllFamilySuccess = (data: BirdFamily[]) => {
  return {
    type: ACTION_TYPES.GET_ALL_FAMILY_SUCCESS,
    payload: data,
  };
};

const getAllFamilyFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ALL_FAMILY_FAILURE,
    payload: message,
  };
};

const getFamilyStart = () => {
  return {
    type: ACTION_TYPES.GET_FAMILY,
  };
};

const getFamilySuccess = (data: BirdFamily) => {
  return {
    type: ACTION_TYPES.GET_FAMILY_SUCCESS,
    payload: data,
  };
};

const getFamilyFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_FAMILY_FAILURE,
    payload: message,
  };
};

export const getAllFamilyAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getAllFamily());
  try {
    const data: any = await getFamilies();
    dispatch(getAllFamilySuccess(data));
  } catch (error) {
    dispatch(getAllFamilyFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get families, please try again !`,
    });
  }
};

export const getFamilyAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getFamilyStart());
  try {
    const data: any = await getFamily(id);
    dispatch(getFamilySuccess(data));
  } catch (error) {
    dispatch(getFamilyFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Cant get family, please try again !`,
    });
  }
};
