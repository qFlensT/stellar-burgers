import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from '../store';
import { fetchFeeds, state } from '../slices/feeds-slice';

export const useFeedsStore = () => {
  const { error, feeds, isLoading, isInitialized } = useSelector(state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized) dispatch(fetchFeeds());
  }, []);

  const refresh = () => {
    // Не реврешим если небыло ни одного маунта хука
    if (isInitialized) dispatch(fetchFeeds());
  };

  return {
    feeds,
    error,
    isLoading,
    refresh
  };
};
