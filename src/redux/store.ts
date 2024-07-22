import { configureStore } from '@reduxjs/toolkit';
import pizza from './pizza/slice';
import filter from './filter/slice';
import cart from './cart/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    pizza,
    filter,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
