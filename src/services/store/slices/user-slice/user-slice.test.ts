import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { fetchUser, reducer } from './user-slice';

const createStore = () => configureStore({ reducer: { orders: reducer } });

describe('userSlice', () => {
  describe('Тестирование асинхронного экшена получения пользователя', () => {
    let store: ReturnType<typeof createStore>;
    const apiMock = jest.spyOn(burgerApi, 'getUserApi');

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

      store.dispatch(fetchUser());

      expect(store.getState().orders).toEqual({
        isLoading: true,
        isInitialized: true,
        error: null,
        user: null
      });
    });

    test('Тестирование состояния успеха', async () => {
      const expectedResult = {
        email: 'test@test.ru',
        name: 'Evgeniy'
      };

      apiMock.mockResolvedValue({ success: true, user: expectedResult });

      await store.dispatch(fetchUser());

      expect(apiMock).toBeCalledTimes(1);
      expect(store.getState().orders).toEqual({
        isLoading: false,
        isInitialized: true,
        error: null,
        user: expectedResult
      });
    });

    test('Тестирование состояния неудачи', async () => {
      apiMock.mockRejectedValue({});

      await store.dispatch(fetchUser());

      expect(store.getState().orders).toEqual({
        isLoading: false,
        isInitialized: true,
        error: expect.anything(),
        user: null
      });
    });
  });
});
