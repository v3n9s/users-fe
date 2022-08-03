import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserInitialState {
  token: string;
}

const token = localStorage.getItem('userToken');

const initialState: UserInitialState = {
  token: token ? token : ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload || '';
    }
  }
});

export const { setUserToken } = userSlice.actions;

export const isLoggedInSelector = (state: RootState) => !!state.user.token;

export const userReducer = userSlice.reducer;
