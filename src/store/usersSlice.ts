import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    }
  }
});

export const { setUsers } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
