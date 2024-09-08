import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store';
import { ProtectedRoute } from '../protected-route';
import { useCallback } from 'react';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = useCallback(() => navigate(-1), []);

  const backgroundLocation = location.state?.background;

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route element={<ConstructorPage />} path='/' />
          <Route element={<Feed />} path='/feed' />
          <Route element={<OrderInfo />} path='/feed/:number' />
          <Route element={<IngredientDetails />} path='/ingredients/:id' />
          <Route
            element={
              <ProtectedRoute protectionType='noAuth'>
                <Login />
              </ProtectedRoute>
            }
            path='/login'
          />
          <Route
            element={
              <ProtectedRoute protectionType='noAuth'>
                <Register />
              </ProtectedRoute>
            }
            path='/register'
          />
          <Route
            element={
              <ProtectedRoute protectionType='noAuth'>
                <ForgotPassword />
              </ProtectedRoute>
            }
            path='/forgot-password'
          />
          <Route
            element={
              <ProtectedRoute protectionType='noAuth'>
                <ResetPassword />
              </ProtectedRoute>
            }
            path='/reset-password'
          />
          <Route
            element={
              <ProtectedRoute protectionType='auth'>
                <Profile />
              </ProtectedRoute>
            }
            path='/profile'
          />
          <Route
            element={
              <ProtectedRoute protectionType='auth'>
                <ProfileOrders />
              </ProtectedRoute>
            }
            path='/profile/orders'
          />
          <Route
            element={
              <ProtectedRoute protectionType='auth'>
                <OrderInfo />
              </ProtectedRoute>
            }
            path='/profile/orders/:number'
          />
          <Route element={<NotFound404 />} path='*' />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              element={
                <Modal title='Информация по заказу' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              }
              path='/feed/:number'
            />
            <Route
              element={
                <Modal
                  title='Информация об ингредиентах'
                  onClose={handleCloseModal}
                >
                  <IngredientDetails />
                </Modal>
              }
              path='/ingredients/:id'
            />
            <Route
              element={
                <ProtectedRoute protectionType='auth'>
                  <Modal
                    title='Информация по заказу'
                    onClose={handleCloseModal}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
              path='/profile/orders/:number'
            />
          </Routes>
        )}
      </div>
    </Provider>
  );
};
export default App;
