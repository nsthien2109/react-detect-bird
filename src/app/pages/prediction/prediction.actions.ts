import { ACTION_TYPES } from '../../store/types';
import { Prediction } from '../../models/prediction';
import { Dispatch } from 'react';
import { RootAction } from '../../store/store';
import { prediction } from '../../shared/services/prediction.services';
import { History } from '../../models/history';
import { getHistory, deleteHistory } from '../../shared/services/history.services';

const predictionBird = () => {
  return {
    type: ACTION_TYPES.PREDICTION_BIRD,
  };
};

const predictionBirdSuccess = (data: Prediction[]) => {
  return {
    type: ACTION_TYPES.PREDICTION_BIRD_SUCCESS,
    payload: data,
  };
};

const predictionBirdFailure = (message: string) => {
  return {
    type: ACTION_TYPES.PREDICTION_BIRD_FAILURE,
    payload: message,
  };
};

const getHistoryStart = () => {
  return {
    type: ACTION_TYPES.GET_HISTORY,
  };
};

const getHistorySuccess = (data: History[]) => {
  return {
    type: ACTION_TYPES.GET_HISTORY_SUCCESS,
    payload: data,
  };
};

const getHistoryFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_HISTORY_FAILURE,
    payload: message,
  };
};

const deleteHistoryStart = () => {
  return {
    type: ACTION_TYPES.DELETE_HISTORY,
  };
};

const deleteHistorySuccess = (id: number) => {
  return {
    type: ACTION_TYPES.DELETE_HISTORY_SUCCESS,
    payload: id,
  };
};

const deleteHistoryFailure = (message: string) => {
  return {
    type: ACTION_TYPES.DELETE_HISTORY_FAILURE,
    payload: message,
  };
};

export const getHistoryAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getHistoryStart());
  try {
    const data = await getHistory();
    dispatch(getHistorySuccess(data as History[]));
  } catch (error) {
    dispatch(getHistoryFailure(`${error}`));
  }
};

export const deleteHistoryAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(deleteHistoryStart());
  try {
    await deleteHistory(id);
    dispatch(deleteHistorySuccess(id));
  } catch (error) {
    dispatch(deleteHistoryFailure(`${error}`));
  }
};

export const predictionBirdAction = (input: File) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(predictionBird());
  const formData = new FormData();
  formData.append('file', input);
  try {
    const data = await prediction(formData);
    dispatch(predictionBirdSuccess(data as Prediction[]));
  } catch (error) {
    dispatch(predictionBirdFailure(`${error}`));
  }
};
