import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/user-slice';
import { reducer as ingredientsReducer } from './slices/ingredients-slice';
import { reducer as feedsReducer } from './slices/feeds-slice';
import { reducer as ordersReducer } from './slices/orders-slice';
import { reducer as ingredientsConstructorReducer } from './slices/ingredients-constructor-slice';
import { reducer as createOrderReducer } from './slices/create-order-slice';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  createOrder: createOrderReducer,
  ingredientsConstructor: ingredientsConstructorReducer
});
