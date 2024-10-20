import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { fetchOrders, reducer } from './orders-slice';

const createStore = () => configureStore({ reducer: { orders: reducer } });

describe('ordersSlice', () => {
  describe('Тестирование асинхронного экшена получения заказов', () => {
    let store: ReturnType<typeof createStore>;
    const apiMock = jest.spyOn(burgerApi, 'getOrdersApi');

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

      store.dispatch(fetchOrders());

      expect(store.getState().orders).toEqual({
        isLoading: true,
        isInitialized: true,
        error: null,
        orders: null
      });
    });

    test('Тестирование состояния успеха', async () => {
      const expectedResult = [
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
      ];

      apiMock.mockResolvedValue(expectedResult);

      await store.dispatch(fetchOrders());

      expect(apiMock).toBeCalledTimes(1);
      expect(store.getState().orders).toEqual({
        isLoading: false,
        isInitialized: true,
        error: null,
        orders: expectedResult
      });
    });

    test('Тестирование состояния неудачи', async () => {
      apiMock.mockRejectedValue({});

      await store.dispatch(fetchOrders());

      expect(store.getState().orders).toEqual({
        isLoading: false,
        isInitialized: true,
        error: expect.anything(),
        orders: null
      });
    });
  });
});
