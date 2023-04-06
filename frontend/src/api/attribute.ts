import { IAttribute } from '../interfaces/attribute';
import { instance } from './axios';

/* create */
export const createAttribute = async (attribute: IAttribute) => {
  try {
    const response = await instance.post(`/attributes`, attribute, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    if (response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* get All */
export const getAllAttributes = async () => {
  try {
    const response = await instance.get(`/attributes`);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* get One */
export const getAttribute = async (id: string) => {
  try {
    const response = await instance.get(`/attributes/${id}`);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* delete */
export const deleteAttribute = async (id: string) => {
  try {
    const response = await instance.delete(`/attributes/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* update */
export const updateAttribute = async (id: string, attribute: IAttribute) => {
  try {
    const response = await instance.put(`/attributes/${id}`, attribute, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
