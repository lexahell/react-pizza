import { ICartItem } from "../redux/cart/types";

export const calcTotalPrice = (items:ICartItem[]) => items.reduce((sum, obj) => {
  return obj.price * obj.count + sum;
}, 0);
