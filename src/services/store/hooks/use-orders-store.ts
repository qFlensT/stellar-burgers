import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from '../store';
import { fetchOrders, state } from '../slices/orders-slice';

export const useOrdersStore = () => {
  const { error, orders, isLoading, isInitialized } = useSelector(state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchOrders());
  }, []);

  const refresh = () => {
    // Не реврешим если небыло ни одного маунта хука
    if (isInitialized) dispatch(fetchOrders());
  };

  return {
    orders,
    error,
    isLoading,
    refresh
  };
};
