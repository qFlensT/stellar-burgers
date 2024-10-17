import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { fetchIngredients, reducer } from './ingredients-slice';

const createStore = () => configureStore({ reducer: { ingredients: reducer } });

describe('ingredientsSlice', () => {
  describe('Тестирование асинхронного экшена получения ингредиентов (fetchIngredients)', () => {
    let store: ReturnType<typeof createStore>;
    const apiMock = jest.spyOn(burgerApi, 'getIngredientsApi');

    beforeEach(() => {
      store = createStore();
      apiMock.mockClear();
    });

    afterAll(() => {
      apiMock.mockRestore();
    });

    test('Тестирование состояния загрузки данных', async () => {
      apiMock.mockReturnValue(
        new Promise((_, reject) => setTimeout(reject, 500))
      );

      store.dispatch(fetchIngredients());

      expect(store.getState().ingredients).toEqual({
        isLoading: true,
        isInitialized: true,
        error: null,
        ingredients: null
      });
    });

    test('Тестирование состояния успеха', async () => {
      const expectedResult = [
        {
          _id: '213',
          name: 'Булочка',
          type: 'bun',
          proteins: 1,
          fat: 5,
          carbohydrates: 12,
          calories: 120,
          price: 1290,
          image: 'https://test.test/',
          image_large: 'https://test.test/',
          image_mobile: 'https://test.test/'
        },
        {
          _id: '531',
          name: 'Ингредиент',
          type: 'main',
          proteins: 8,
          fat: 2,
          carbohydrates: 3,
          calories: 44,
          price: 990,
          image: 'https://test.test/',
          image_large: 'https://test.test/',
          image_mobile: 'https://test.test/'
        }
      ];

      apiMock.mockResolvedValue(expectedResult);

      await store.dispatch(fetchIngredients());

      expect(apiMock).toBeCalledTimes(1);
      expect(store.getState().ingredients).toEqual({
        isLoading: false,
        isInitialized: true,
        error: null,
        ingredients: expectedResult
      });
    });

    test('Тестирование состояния неудачи', async () => {
      apiMock.mockRejectedValue({});

      await store.dispatch(fetchIngredients());

      expect(store.getState().ingredients).toEqual({
        isLoading: false,
        isInitialized: true,
        error: expect.anything(),
        ingredients: null
      });
    });
  });
});
