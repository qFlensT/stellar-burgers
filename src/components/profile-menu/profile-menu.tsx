import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAuth } from '../../hooks/use-auth';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
