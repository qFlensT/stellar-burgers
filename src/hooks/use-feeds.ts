import { useFeedsStore } from '@store';

export const useFeeds = () => {
  const { error, isLoading, feeds, refresh } = useFeedsStore();

  return { state: { error, isLoading, feeds }, actions: { refresh } };
};
