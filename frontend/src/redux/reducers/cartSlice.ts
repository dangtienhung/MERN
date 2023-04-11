import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ICart } from '../../interfaces/cart';
import { IProduct } from '../../interfaces/product';
import axios from 'axios';

interface ICartState {
  cart: ICart[];
  total: number;
  totalItems: number;
  loading: boolean;
}

export interface CartState {
  cart: IProduct[];
  total: number;
  totalItems: number;
  loading: boolean;
}

/* asyncThunk */
export const fetchData = createAsyncThunk('cart/fetchData', async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/carts`);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
});
export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (Cart: ICart) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/carts`, Cart);
    if (response && response.data) {
      return response.data.cart;
    }
  } catch (error) {
    console.log(error);
  }
});
export const getOneProductToCart = createAsyncThunk(
  'cart/getOneProductToCart',
  async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carts/${id}`);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: ICartState = {
  cart: [],
  total: 0,
  totalItems: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* get all cart */
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
    /* add product to cart */
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const cart = action.payload;
      state.cart.push(cart);
      state.loading = false;
    });
    builder.addCase(addProductToCart.rejected, (state) => {
      state.loading = false;
    });
    /* get one product to cart */
    builder.addCase(getOneProductToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneProductToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;
