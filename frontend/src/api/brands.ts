import { instance } from './axios';

/* create */
export const createBrand = async (name: string) => {
  try {
    const data = await instance.post('/brands', name, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* get all brands */
export const getAllBrands = async () => {
  try {
    const response = await instance.get('/brands');
    return response;
  } catch (error) {
    console.log(error);
  }
};

/* get one */
export const getOneBrand = async (id: string) => {
  try {
    const response = await instance.get(`/brands/${id}`);
    if (response.data && response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/* update */
export const updateBrand = async (id: string, name: string) => {
  try {
    const response = await instance.put(`/brands/${id}`, name, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

/* delete */
export const deleteBrand = async (id: string) => {
  try {
    const response = await instance.delete(`/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
