import { ICartItem } from "../redux/slices/cartSlice";

export const updateCartInLS = (items:ICartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};
