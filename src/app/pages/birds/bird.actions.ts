import { Dispatch } from 'react';
import { Bird } from '../../models/bird';
import { ACTION_TYPES } from '../../store/types';
import { RootAction } from '../../store/store';
import { getBirds, getBirdData } from '../../shared/services/bird.services';

type PayloadSuccessData = {
  data: Bird[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};

const getAllBird = () => {
  return {
    type: ACTION_TYPES.GET_ALL_BIRD,
  };
};

const getAllBirdSuccess = (data: PayloadSuccessData) => {
  return {
    type: ACTION_TYPES.GET_ALL_BIRD_SUCCESS,
    payload: data,
  };
};

const getAllBirdFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ALL_BIRD_FAILURE,
    payload: message,
  };
};

const getBird = () => {
  return {
    type: ACTION_TYPES.GET_BIRD,
  };
};

const getBirdSuccess = (data: Bird) => {
  return {
    type: ACTION_TYPES.GET_BIRD_SUCCESS,
    payload: data,
  };
};

const getBirdFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_BIRD_FAILURE,
    payload: message,
  };
};

export const getAllBirdsAction = (page: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getAllBird());
  try {
    const data: any = await getBirds(page);
    console.log(data);
    dispatch(
      getAllBirdSuccess({
        data: data.results,
        page: data.page,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        total: data.total,
      })
    );
  } catch (error) {
    dispatch(getAllBirdFailure(`${error}`));
  }
};

export const getBirdAction = (birdId: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getBird());
  try {
    const data = await getBirdData(birdId);
    console.log(data);

    dispatch(getBirdSuccess(data as Bird));
  } catch (error) {
    dispatch(getBirdFailure(`${error}`));
  }
};
