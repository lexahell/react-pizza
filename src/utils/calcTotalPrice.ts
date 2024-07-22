import { ICartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items:ICartItem[]) => items.reduce((sum, obj) => {
  return obj.price * obj.count + sum;
}, 0);
