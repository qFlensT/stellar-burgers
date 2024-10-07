import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { SliceState } from '../types';

type OrdersState = SliceState<'orders', TOrder[]>;

const initialState: OrdersState = {
  isLoading: true,
  error: null,
  orders: null,
  isInitialized: false
};

export const fetchOrders = createAsyncThunk('orders/getAll', getOrdersApi);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  selectors: {
    state: (state) => state,
    isLoading: (state) => state.isLoading,
    orders: (state) => state.orders,
    isInitialized: (state) => state.isInitialized,
    error: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.orders = null;
    });
    builder.addCase(fetchOrders.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.orders = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.orders = payload;
    });
  }
});

export const { state, error, orders, isInitialized, isLoading } =
  ordersSlice.selectors;

export const { reducer } = ordersSlice;
