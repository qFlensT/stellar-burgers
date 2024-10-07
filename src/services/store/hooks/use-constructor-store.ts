import { TIngredient } from '@utils-types';
import {
  state,
  addItem,
  removeItem,
  changeItemPosition,
  resetState
} from '../slices/ingredients-constructor-slice';
import { useDispatch, useSelector } from '../store';

export const useIngredientsConstructorStore = () => {
  const { bun, ingredients } = useSelector(state);
  const dispatch = useDispatch();

  const add = (item: TIngredient) => dispatch(addItem(item));

  const removeIngredient = (ingredientId: string) => {
    dispatch(removeItem({ id: ingredientId }));
  };

  const changeIngredientPosition = (
    payload: Parameters<typeof changeItemPosition>[0]
  ) => {
    dispatch(changeItemPosition(payload));
  };

  const reset = () => dispatch(resetState());

  return {
    bun,
    ingredients,
    add,
    changeIngredientPosition,
    reset,
    removeIngredient
  };
};
