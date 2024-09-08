import {
  useCreateOrderStore,
  useIngredientsConstructorStore,
  useOrdersStore
} from '@store';

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

  const create = (ids: string[]) =>
    createOrder(ids)
      .then(() => {
        resetIngredients();
        refresh();
      })
      .catch(console.error);

  return {
    state: { createdOrder, isLoading, error },
    actions: { reset, create }
  };
};
