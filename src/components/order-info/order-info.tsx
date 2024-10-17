import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useIngredients } from '../../hooks/use-ingredients';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const location = useLocation();

  const [orderState, setOrderState] = useState<{
    order: TOrder | null;
    isLoading: boolean;
  }>({ isLoading: true, order: null });

  // Можно было бы сначала проверять локальное хранилище, если не находим - запрашиваем сервер
  useEffect(() => {
    getOrderByNumberApi(+number!).then((res) =>
      setOrderState({ isLoading: false, order: res.orders[0] })
    );
  }, []);

  const {
    state: { ingredients, isLoading: ingredientsIsLoading }
  } = useIngredients();

  const orderData = orderState.order;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (orderState.isLoading || ingredientsIsLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <>Не удалось найти заказ</>;
  }

  return (
    <OrderInfoUI
      printOrderNumber={!location.state?.background}
      orderInfo={orderInfo}
    />
  );
};
