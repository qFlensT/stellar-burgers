const API_BASE_URL = Cypress.env('BURGER_API_URL');

const ENDPOINTS = {
  GET_INGREDIENTS: 'ingredients',
  GET_USER: 'auth/user',
  POST_CREATE_ORDER: 'orders'
};

export const API_ENDPOINTS = Object.entries(ENDPOINTS).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: `${API_BASE_URL}/${value}` }),
  {} as {
    [K in keyof typeof ENDPOINTS]: string;
  }
);

export default API_ENDPOINTS;
