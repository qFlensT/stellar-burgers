import { rootReducer } from './root-reducer';
import { initialState as userInitialState } from './slices/user-slice';
import { initialState as ingredientsInitialState } from './slices/ingredients-slice';
import { initialState as feedsInitialState } from './slices/feeds-slice';
import { initialState as ordersInitialState } from './slices/orders-slice';
import { initialState as createOrderInitialState } from './slices/create-order-slice';
import { initialState as ingredientsConstructorInitialState } from './slices/ingredients-constructor-slice';

describe('rootReducer', () => {
  test('Вызов rootReducer с undefined состоянием и неизвестным экшеном возвращает корректное начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedInitialState = {
      user: userInitialState,
      ingredients: ingredientsInitialState,
      feeds: feedsInitialState,
      orders: ordersInitialState,
      createOrder: createOrderInitialState,
      ingredientsConstructor: ingredientsConstructorInitialState
    };

    expect(initialState).toEqual(expectedInitialState);
  });
});
