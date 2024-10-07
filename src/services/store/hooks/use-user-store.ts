import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from '../store';
import { fetchUser, state } from '../slices/user-slice';

export const useUserStore = () => {
  const { error, user, isLoading, isInitialized } = useSelector(state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchUser());
  }, []);

  const refresh = () => {
    // Не реврешим если небыло ни одного маунта хука
    if (isInitialized) dispatch(fetchUser());
  };

  return {
    user,
    error,
    isLoading,
    refresh
  };
};
