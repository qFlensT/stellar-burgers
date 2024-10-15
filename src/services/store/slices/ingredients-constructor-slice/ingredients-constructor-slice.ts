import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  selectors: {
    state: (state) => state
  },
  reducers: {
    resetState: () => initialState,
    addItem: {
      reducer: (
        state,
        { payload: item }: PayloadAction<TConstructorIngredient | TIngredient>
      ) => {
        //TConstructorIngredient type guard
        if (!('id' in item)) return;

        if (item.type === 'bun') state.bun = item;
        else state.ingredients.push(item);
      },

      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: v4() }
      })
    },
    changeItemPosition: (
      state,
      {
        payload: {
          id,
          options: { dir, step }
        }
      }: PayloadAction<{
        id: string;
        options: { step: number; dir: 'forward' | 'back' };
      }>
    ) => {
      const ingredientsMaxIndex = state.ingredients.length - 1;
      const elemIndex = state.ingredients.findIndex((ing) => ing.id === id);

      if (elemIndex === -1) {
        throw new Error(`Ингидиент с ID:${id} не был найден!`);
      }

      let newElemIndex =
        dir === 'forward' ? elemIndex + step : elemIndex - step;

      if (newElemIndex > ingredientsMaxIndex)
        newElemIndex = ingredientsMaxIndex;

      if (newElemIndex < 0) newElemIndex = 0;

      const newIngredientsArr = [...state.ingredients];

      [newIngredientsArr[newElemIndex], newIngredientsArr[elemIndex]] = [
        state.ingredients[elemIndex],
        state.ingredients[newElemIndex]
      ];

      state.ingredients = newIngredientsArr;
    },
    removeItem: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter((ing) => ing.id !== id);
    }
  }
});

export const { state } = ingredientsConstructorSlice.selectors;

export const { addItem, changeItemPosition, removeItem, resetState } =
  ingredientsConstructorSlice.actions;

export const { reducer } = ingredientsConstructorSlice;
