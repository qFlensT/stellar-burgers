import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from '../store';
import { fetchIngredients, state } from '../slices/ingredients-slice';

export const useIngredientsStore = () => {
  const { error, ingredients, isLoading, isInitialized } = useSelector(state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchIngredients());
  }, []);

  const refresh = () => {
    // Не реврешим если небыло ни одного маунта хука
    if (isInitialized) dispatch(fetchIngredients());
  };

  return {
    ingredients,
    error,
    isLoading,
    refresh
  };
};
