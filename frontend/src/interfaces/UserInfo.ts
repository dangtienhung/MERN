export interface IUserInfo {
  email: string;
  password: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserData {
  _id: string;
  username: string;
  email: string;
  role: string;
}
