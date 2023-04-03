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
