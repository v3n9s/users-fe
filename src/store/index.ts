import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './usersSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer
  }
});

store.subscribe(() => {
  const token = store.getState().user.token;
  if (token) {
    localStorage.setItem('userToken', token);
  } else {
    localStorage.removeItem('userToken');
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
