import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { SliceState } from '../types';
import { getUserApi } from '@api';

export type UserState = SliceState<'user', TUser>;

const initialState: UserState = {
  isLoading: true,
  error: null,
  user: null,
  isInitialized: false
};

export const fetchUser = createAsyncThunk('user/get', getUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    state: (state) => state,
    isLoading: (state) => state.isLoading,
    user: (state) => state.user,
    isInitialized: (state) => state.isInitialized,
    error: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload: { user } }) => {
      state.error = null;
      state.isLoading = false;
      state.user = user;
    });
  }
});

export const { error, isInitialized, isLoading, state, user } =
  userSlice.selectors;

export const { reducer } = userSlice;
