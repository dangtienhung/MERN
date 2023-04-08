import { ISpecification } from '../interfaces/specification';
import { instance } from './axios';

/* create */
export const createSpecification = async (data: ISpecification) => {
  try {
    const response = await instance.post(`/specifications`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* read all */
export const getAllSpecifications = async () => {
  try {
    const response = await instance.get('/specifications');
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* read one */
export const getSpecification = async (id: string) => {
  try {
    const response = await instance.get(`/specifications/${id}`);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* update */
export const updateSpecification = async (id: string, data: ISpecification) => {
  try {
    const response = await instance.put(`/specifications/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* delete */
export const deleteSpecification = async (id: string) => {
  try {
    const response = await instance.delete(`/specifications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
