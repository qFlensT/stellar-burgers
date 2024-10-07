import { Preloader } from '@ui';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/use-user';

export type ProtectedRouteProps = {
  children: ReactNode;
  protectionType: 'noAuth' | 'auth';
};

export const ProtectedRoute = ({
  children,
  protectionType
}: ProtectedRouteProps) => {
  const {
    state: { user, isLoading }
  } = useUser();

  if (isLoading) return <Preloader />;

  if (protectionType === 'auth') {
    if (!user) return <Navigate to='/login' />;

    return children;
  }

  if (user) return <Navigate to='/' />;

  return children;
};
