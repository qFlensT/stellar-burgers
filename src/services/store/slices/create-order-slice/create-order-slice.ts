import { TOrder } from '@utils-types';
import { SliceState } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type CreateOrderState = SliceState<'createdOrder', TOrder | null>;

const initialState: CreateOrderState = {
  createdOrder: null,
  error: null,
  isInitialized: false,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'createOrder/create',
  (data: string[]) => orderBurgerApi(data)
);

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: initialState,
  selectors: {
    state: (state) => state
  },
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.createdOrder = null;
    });
    builder.addCase(createOrder.rejected, (state, { error }) => {
      if (!state.isInitialized) return;

      state.error = error;
      state.isLoading = false;
      state.createdOrder = null;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      if (!state.isInitialized) return;

      state.error = null;
      state.isLoading = false;
      state.createdOrder = payload.order;
    });
  }
});

export const { state } = createOrderSlice.selectors;

export const { resetState } = createOrderSlice.actions;

export const { reducer } = createOrderSlice;
