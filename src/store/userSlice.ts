import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserInitialState {
  token: string;
  id: number | null;
}

const user = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: UserInitialState = {
  token: user.token ? user.token : '',
  id: user.id ? +user.id : null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInitialState>) => {
      return action.payload;
    },
    removeUser: (state) => {
      state.token = '';
      state.id = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const isLoggedInSelector = (state: RootState) => !!state.user.token;

export const userReducer = userSlice.reducer;
