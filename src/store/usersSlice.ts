import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../services/users';
import { User, UserIsChecked } from '../types/user';

const initialState: UserIsChecked[] = [];

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args, thunkAPI) => {
    const users = await getUsers();
    thunkAPI.dispatch(setUsers(users));
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload.map((user) => ({
        ...user,
        isChecked: false,
        registrationDate: new Date(user.registrationDate).toLocaleDateString(),
        lastLoginDate: user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : null
      }));
    },
    toggleIsChecked: (state, action: PayloadAction<User['id']>) => {
      return state.map((user) => {
        if (user.id === action.payload) {
          return {
            ...user,
            isChecked: !user.isChecked
          }
        }
        return user;
      });
    },
    toggleAllIsChecked: (state, action: PayloadAction<boolean>) => {
      return state.map((user) => ({
        ...user,
        isChecked: action.payload
      }));
    }
  }
});

export const { setUsers, toggleIsChecked, toggleAllIsChecked } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
