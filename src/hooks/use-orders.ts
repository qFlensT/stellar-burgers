import { useOrdersStore } from '@store';

export const useOrders = () => {
  const { error, isLoading, orders, refresh } = useOrdersStore();

  return { state: { error, isLoading, orders }, actions: { refresh } };
};
