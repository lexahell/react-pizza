import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzaData, Pizza } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaData>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    let { data } = await axios.get<Pizza[]>(
      `https://66506f00ec9b4a4a60320d7d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4${search}`
    );
    return data;
  }
);