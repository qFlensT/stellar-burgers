import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useIngredients } from '../../hooks/use-ingredients';
import { Preloader } from '@ui';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const {
    state: { ingredients, isLoading }
  } = useIngredients();
  const location = useLocation();

  /** TODO: взять переменную из стора */
  const orderIngredients: TIngredient[] =
    ingredients?.filter((ing) =>
      order.ingredients.some((id) => ing._id === id)
    ) || [];
  // const orderIngredients: TIngredient[] = [];

  const orderInfo = useMemo(() => {
    if (!orderIngredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = orderIngredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  if (isLoading) return <Preloader />;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
