import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useOrders } from '../../hooks/use-orders';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const {
    state: { orders, isLoading }
  } = useOrders();

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders!} />;
};
