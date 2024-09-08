import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useIngredientsConstructor } from '../../hooks/use-ingredients-constructor';
import { useCreateOrder } from '../../hooks/use-create-order';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useIngredientsConstructor();
  const {
    state: { isLoading, createdOrder },
    actions: { create, reset }
  } = useCreateOrder();

  const constructorItems = {
    bun,
    ingredients
  };

  // Отвечает за отображение модального окна с оформлением заказа
  const orderRequest = isLoading;

  const orderModalData = createdOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    create([bun!._id, ...ingredients!.map((ing) => ing._id)]);
  };
  const closeOrderModal = () => {
    reset();
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
