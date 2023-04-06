import { IUser, IUserInfo } from '../interfaces/UserInfo';

import { instance } from './axios';

/* register */
export const register = (data: IUser) => {
  return instance.post(`/register`, data);
};

/* login */
export const login = (data: IUserInfo) => {
  return instance.post(`/login`, data);
};

/* lấy ra thông tin người dùng */
export const getOneUser = async (id: string) => {
  try {
    const response = await instance.get(`/users/${id}`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* lấy ra tất cả */
export const getAllUsers = async () => {
  try {
    const response = await instance.get(`/users`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* delete */
export const deleteUser = async (id: string) => {
  try {
    const response = await instance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
