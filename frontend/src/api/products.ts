import { IProduct } from '../interfaces/product';
import axios from 'axios';
import { instance } from './axios';

/* create products */
export const createProduct = async (product: IProduct) => {
  try {
    const response = await instance.post(`/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('🚀 ~ file: products.ts:10 ~ createProduct ~ response:', response);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* get all product */
export const getAllProducts = async () => {
  try {
    const response = await instance.get(`/products`);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* get product by id */
export const getProductById = async (id: string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* update */
export const updateProduct = async (id: string, product: IProduct) => {
  try {
    const response = await instance.put(`/products/${id}`, product, {
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
export const deleteProduct = async (id: string) => {
  try {
    const response = await instance.delete(`/products/${id}`, {
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
