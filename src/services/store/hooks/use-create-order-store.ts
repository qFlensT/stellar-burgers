import { createOrder, resetState, state } from '../slices/create-order-slice';
import { useDispatch, useSelector } from '../store';

export const useCreateOrderStore = () => {
  const { createdOrder, error, isLoading } = useSelector(state);

  const dispatch = useDispatch();

  const reset = () => dispatch(resetState());

  const create = (ids: string[]) => dispatch(createOrder(ids));

  return { createdOrder, error, isLoading, reset, create };
};
