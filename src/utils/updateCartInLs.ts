import { ICartItem } from "../redux/cart/types";

export const updateCartInLS = (items:ICartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};
