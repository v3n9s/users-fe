import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './usersSlice';
import { userReducer } from './userSlice';
import { alertsReducer } from './alertsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    alerts: alertsReducer
  }
});

store.subscribe(() => {
  const { user } = store.getState();
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
