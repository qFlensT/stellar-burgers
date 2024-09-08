import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useIngredientsConstructor } from '../../hooks/use-ingredients-constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const {
      actions: { moveIngredientDown, moveIngredientUp, removeIngredient }
    } = useIngredientsConstructor();

    const handleMoveDown = () => moveIngredientDown(ingredient.id);

    const handleMoveUp = () => moveIngredientUp(ingredient.id);

    // 👍 naming
    const handleClose = () => removeIngredient(ingredient.id);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
