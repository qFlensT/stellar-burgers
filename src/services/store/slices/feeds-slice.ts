import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { SliceState } from '../types';

type IngredientsState = SliceState<'feeds', TOrdersData>;

const initialState: IngredientsState = {
  isLoading: true,
  error: null,
  feeds: null,
  isInitialized: false
};

export const fetchFeeds = createAsyncThunk('feeds/get', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  selectors: {
    state: (state) => state,
    isLoading: (state) => state.isLoading,
    feeds: (state) => state.feeds,
    isInitialized: (state) => state.isInitialized,
    error: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.feeds = null;
    });
    builder.addCase(fetchFeeds.rejected, (state, { payload }) => {
      state.error = payload;
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

export const { state, error, feeds, isInitialized, isLoading } =
  feedsSlice.selectors;

export const { reducer } = feedsSlice;
