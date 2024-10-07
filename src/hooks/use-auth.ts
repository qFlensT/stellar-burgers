import { loginUserApi, logoutApi, registerUserApi } from '@api';
import { useUser } from './use-user';
import { deleteTokens, setAccessToken, setRefreshToken } from '../utils/tokens';
import { useOrders } from './use-orders';
import { useOrdersStore, useUserStore } from '@store';

export const useAuth = () => {
  // Импортируем хуки стора чтобы небыло кросс-импортов
  const { refresh: refreshUser } = useUserStore();
  const { refresh: refreshOrders } = useOrdersStore();

  const logout = () => {
    logoutApi()
      .then(() => {
        deleteTokens();
        refreshUser();
        refreshOrders();
      })
      .catch(console.error);
  };

  const register = (data: Parameters<typeof registerUserApi>[0]) => {
    registerUserApi(data)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setAccessToken(res.accessToken);
        refreshUser();
        refreshOrders();
      })
      .catch(console.error);
  };

  const login = (data: Parameters<typeof loginUserApi>[0]) => {
    loginUserApi(data)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setAccessToken(res.accessToken);
        refreshUser();
        refreshOrders();
      })
      .catch(console.error);
  };

  return { logout, register, login };
};
