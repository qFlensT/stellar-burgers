import {
  useCreateOrderStore,
  useIngredientsConstructorStore,
  useOrdersStore,
  useUserStore
} from '@store';
import { useNavigate } from 'react-router-dom';

export const useCreateOrder = () => {
  const {
    create: createOrder,
    createdOrder,
    error,
    isLoading,
    reset
  } = useCreateOrderStore();
  const { refresh } = useOrdersStore();
  const { reset: resetIngredients } = useIngredientsConstructorStore();
  const { user } = useUserStore();

  const navigate = useNavigate();

  const create = (ids: string[]) => {
    if (!user) {
      navigate('/login');
      return;
    }
    createOrder(ids)
      .then(() => {
        resetIngredients();
        refresh();
      })
      .catch(console.error);
  };

  return {
    state: { createdOrder, isLoading, error },
    actions: { reset, create }
  };
};
