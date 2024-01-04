import { ACTION_TYPES } from '../../store/types';
import { Dispatch } from 'react';
import { RootAction } from '../../store/store';
import { createUser, deleteUser, getUsers, updateUser } from '../../shared/services/user.services';
import { message } from 'antd';
import { CreateUserData, User, Role } from '../../models/user';

const getAllUser = () => {
  return {
    type: ACTION_TYPES.GET_ALL_USERS,
  };
};

const getAllUserSuccess = (data: User[]) => {
  return {
    type: ACTION_TYPES.GET_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const getAllUserFailure = (message: string) => {
  return {
    type: ACTION_TYPES.GET_ALL_USERS_FAILURE,
    payload: message,
  };
};

export const getUserData = (data: User) => {
  return {
    type: ACTION_TYPES.GET_USER_DATA,
    payload: data,
  };
};

const createUserStart = () => {
  return {
    type: ACTION_TYPES.CREATE_USER,
  };
};

const createUserSuccess = (data: User) => {
  return {
    type: ACTION_TYPES.CREATE_USER_SUCCESS,
    payload: data,
  };
};

const createUserFailure = (message: string) => {
  return {
    type: ACTION_TYPES.CREATE_USER_FAILURE,
    payload: message,
  };
};

const deleteUserStart = () => {
  return {
    type: ACTION_TYPES.DELETE_USER,
  };
};

const deleteUserSuccess = (id: number) => {
  return {
    type: ACTION_TYPES.DELETE_USER_SUCCESS,
    payload: id,
  };
};

const deleteUserFailure = (message: string) => {
  return {
    type: ACTION_TYPES.DELETE_USER_FAILURE,
    payload: message,
  };
};

const updateUserStart = () => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
  };
};

const updateUserSuccess = (user: User) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_SUCCESS,
    payload: user,
  };
};

const updateUserFailure = (message: string) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_FAILURE,
    payload: message,
  };
};

export const getAllUsersAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getAllUser());
  try {
    const data: any = await getUsers();
    dispatch(getAllUserSuccess(data));
  } catch (error) {
    dispatch(getAllUserFailure(`${error}`));
  }
};

export const updateUserAction = (id: number, userData: User) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateUserStart());
  try {
    const data = await updateUser(id, userData);
    dispatch(updateUserSuccess(data as User));
  } catch (error) {
    dispatch(updateUserFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Update user failure !`,
    });
  }
};

export const deleteUserAction = (idUser: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(deleteUserStart());
  try {
    await deleteUser(idUser);
    dispatch(deleteUserSuccess(idUser));
    message.open({
      type: 'success',
      content: `Delete user successfully !`,
    });
  } catch (error) {
    dispatch(deleteUserFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Delete user failure !`,
    });
  }
};

export const createUserAction = (input: CreateUserData) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(createUserStart());
  try {
    const data: any = await createUser(input);
    const role: Role = {
      id: data.data.role,
      name: data.data.role === 1 ? 'Admin' : 'User',
    };
    const newUser: User = {
      histories: [],
      createdAt: data.data.createdAt,
      email: data.data.email,
      isActive: data.data.isActive,
      role: role,
      username: data.data.username,
      id: data.data.id,
    };
    dispatch(createUserSuccess(newUser));
  } catch (error) {
    dispatch(createUserFailure(`${error}`));
    message.open({
      type: 'error',
      content: `Create user failure !`,
    });
  }
};
