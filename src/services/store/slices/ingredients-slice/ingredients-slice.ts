import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { SliceState } from '../../types';

type IngredientsState = SliceState<'ingredients', TIngredient[]>;

const initialState: IngredientsState = {
  isLoading: true,
  error: null,
  ingredients: null,
  isInitialized: false
};

export const fetchIngredients = createAsyncThunk('ingredients/getAll', () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  selectors: {
    state: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isInitialized = true;
      state.error = null;
      state.isLoading = true;
      state.ingredients = null;
    });
    builder.addCase(fetchIngredients.rejected, (state, { error }) => {
      state.error = error;
      state.isLoading = false;
      state.ingredients = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.ingredients = payload;
    });
  }
});

export const { state } = ingredientsSlice.selectors;

export const { reducer } = ingredientsSlice;
