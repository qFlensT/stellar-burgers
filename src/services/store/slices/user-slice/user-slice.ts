import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { SliceState } from '../../types';
import { getUserApi } from '@api';

type UserState = SliceState<'user', TUser>;

export const initialState: UserState = {
  isLoading: true,
  error: null,
  user: null,
  isInitialized: false
};

export const fetchUser = createAsyncThunk('user/get', () => getUserApi());

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    state: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchUser.rejected, (state, { error }) => {
      state.error = error;
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

export const { state } = userSlice.selectors;

export const { reducer } = userSlice;
