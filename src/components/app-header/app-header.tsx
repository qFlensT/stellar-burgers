import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useUser } from '../../hooks/use-user';

export const AppHeader: FC = () => {
  const {
    state: { user }
  } = useUser();

  return <AppHeaderUI userName={user?.name} />;
};
