import { updateUserApi } from '@api';
import { useUserStore } from '@store';

export const useUser = () => {
  const { error, isLoading, refresh, user } = useUserStore();

  const update = (dto: Parameters<typeof updateUserApi>[0]) => {
    updateUserApi(dto).then(refresh).catch(console.error);
  };

  return { state: { isLoading, error, user }, actions: { refresh, update } };
};
