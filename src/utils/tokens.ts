import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';
import { deleteCookie, getCookie, setCookie } from './cookie';

export const setAccessToken = (token: string) => {
  setCookie(ACCESS_TOKEN_KEY, token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const deleteTokens = () => {
  deleteCookie(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => getCookie(ACCESS_TOKEN_KEY) || null;

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
