import { IProduct } from '../../interfaces/product';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cart: IProduct[];
  total: number;
  totalItems: number;
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  total: 0,
  totalItems: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /* add to cart */
    addToCart: (state, action: { payload: IProduct }) => {
      const product = action.payload;
      const item = state.cart.find((i) => i._id === product._id);
      console.log('🚀 ~ file: cartSlice.ts:26 ~ item:', item);
      state.totalItems += 1;
      state.total += product.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
