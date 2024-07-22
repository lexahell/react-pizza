import { RootState } from '../store';
import { ICartItem } from './types';

export const selectCart = (state: RootState) => state.cart;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: ICartItem) => obj.id === id);
