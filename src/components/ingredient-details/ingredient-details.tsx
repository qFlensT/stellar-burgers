import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useIngredients } from '../../hooks/use-ingredients';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const {
    state: { ingredients, isLoading }
  } = useIngredients();

  const { id } = useParams<{ id: string }>();

  if (isLoading) return <Preloader />;

  const ingredientData = ingredients!.find((ing) => ing._id === id);

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
