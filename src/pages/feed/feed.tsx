import { useFeedsStore } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useFeeds } from '../../hooks/use-feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const {
    state: { feeds, isLoading },
    actions: { refresh }
  } = useFeeds();

  if (isLoading) {
    return <Preloader />;
  }
  const orders: TOrder[] = feeds!.orders;

  return <FeedUI orders={orders} handleGetFeeds={refresh} />;
};
