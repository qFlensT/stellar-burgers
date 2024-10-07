import { useIngredientsStore } from '@store';

export const useIngredients = () => {
  const { error, ingredients, isLoading, refresh } = useIngredientsStore();

  return { state: { error, ingredients, isLoading }, actions: { refresh } };
};
