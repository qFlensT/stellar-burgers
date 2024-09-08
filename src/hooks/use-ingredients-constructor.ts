import { useIngredientsConstructorStore } from '@store';

export const useIngredientsConstructor = () => {
  const { add, bun, ingredients, changeIngredientPosition, removeIngredient } =
    useIngredientsConstructorStore();

  const moveIngredientDown = (ingredientId: string) => {
    changeIngredientPosition({
      id: ingredientId,
      options: { step: 1, dir: 'forward' }
    });
  };

  const moveIngredientUp = (ingredientId: string) => {
    changeIngredientPosition({
      id: ingredientId,
      options: { step: 1, dir: 'back' }
    });
  };

  return {
    bun,
    ingredients,
    actions: { add, removeIngredient, moveIngredientDown, moveIngredientUp }
  };
};
