import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { SliceState } from '../../types';

type IngredientsState = SliceState<'feeds', TOrdersData>;

export const initialState: IngredientsState = {
  isLoading: true,
  error: null,
  feeds: null,
  isInitialized: false
};

export const fetchFeeds = createAsyncThunk('feeds/get', () => getFeedsApi());

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  selectors: {
    state: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.feeds = null;
    });
    builder.addCase(fetchFeeds.rejected, (state, { error }) => {
      state.error = error;
      state.isLoading = false;
      state.feeds = null;
    });
    builder.addCase(
      fetchFeeds.fulfilled,
      (state, { payload: { success, ...feeds } }) => {
        state.error = null;
        state.isLoading = false;
        state.feeds = feeds;
      }
    );
  }
});

export const { state } = feedsSlice.selectors;

export const { reducer } = feedsSlice;
