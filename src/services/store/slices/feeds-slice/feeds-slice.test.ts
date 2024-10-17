import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { fetchFeeds, reducer } from './feeds-slice';

const createStore = () => configureStore({ reducer: { feeds: reducer } });

describe('feedsSlice', () => {
  describe('Тестирование асинхронного экшена получения новостей (feeds)', () => {
    let store: ReturnType<typeof createStore>;
    const apiMock = jest.spyOn(burgerApi, 'getFeedsApi');

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

      store.dispatch(fetchFeeds());

      expect(store.getState().feeds).toEqual({
        isLoading: true,
        isInitialized: true,
        error: null,
        feeds: null
      });
    });

    test('Тестирование состояния успеха', async () => {
      const expectedResult = {
        orders: [
          {
            ingredients: [''],
            _id: '67067f5f13a2b7001c8f0ec5',
            owner: {
              name: 'evgeniy',
              email: 'zhekos1123@ya.ru',
              createdAt: '2024-09-06T11:58:08.568Z',
              updatedAt: '2024-09-07T09:02:19.864Z'
            },
            status: 'done',
            name: 'Экзо-плантаго флюоресцентный бургер',
            createdAt: '2024-10-09T13:04:31.503Z',
            updatedAt: '2024-10-09T13:04:32.490Z',
            number: 55781,
            price: 5388
          }
        ],
        total: 2000,
        totalToday: 20
      };

      apiMock.mockResolvedValue({ success: true, ...expectedResult });

      await store.dispatch(fetchFeeds());

      expect(apiMock).toBeCalledTimes(1);
      expect(store.getState().feeds).toEqual({
        isLoading: false,
        isInitialized: true,
        error: null,
        feeds: expectedResult
      });
    });

    test('Тестирование состояния неудачи', async () => {
      apiMock.mockRejectedValue({});

      await store.dispatch(fetchFeeds());

      expect(store.getState().feeds).toEqual({
        isLoading: false,
        isInitialized: true,
        error: expect.anything(),
        feeds: null
      });
    });
  });
});
