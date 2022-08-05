import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '.';
import {
  deleteUser as deleteUserApi,
  getUsers,
  updateUser as updateUserApi
} from '../services/users';
import { User, UserIsChecked } from '../types/user';

const initialState: UserIsChecked[] = [];

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args, thunkAPI) => {
    const users = await getUsers();
    thunkAPI.dispatch(setUsers(users));
  }
);

export const blockCheckedUsers = createAsyncThunk(
  'users/blockCheckedUsers',
  async (args, thunkAPI) => {
    getCheckedUsersSelector(store.getState()).forEach(async ({ id }) => {
      if (await updateUserApi(id, { isBlocked: true })) {
        thunkAPI.dispatch(updateUser({ id, isBlocked: true }));
      }
    });
  }
);

export const unblockCheckedUsers = createAsyncThunk(
  'users/unblockCheckedUsers',
  async (args, thunkAPI) => {
    getCheckedUsersSelector(store.getState()).forEach(async ({ id }) => {
      if (await updateUserApi(id, { isBlocked: false })) {
        thunkAPI.dispatch(updateUser({ id, isBlocked: false }));
      }
    });
  }
);

export const deleteCheckedUsers = createAsyncThunk(
  'users/deleteCheckedUsers',
  async (args, thunkAPI) => {
    getCheckedUsersSelector(store.getState()).forEach(async ({ id }) => {
      if (await deleteUserApi(id)) {
        thunkAPI.dispatch(deleteUser(id));
      }
    });
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
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<UserIsChecked> & Pick<UserIsChecked, 'id'>>
    ) => {
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          }
        }
        return user;
      });
    },
    deleteUser: (state, action: PayloadAction<User['id']>) => {
      return state.filter(({ id }) => id !== action.payload);
    }
  }
});

export const {
  setUsers,
  toggleIsChecked,
  toggleAllIsChecked,
  updateUser,
  deleteUser
} = usersSlice.actions;

export const getCheckedUsersSelector = (state: RootState) => {
  return state.users.filter(({ isChecked }) => isChecked);
}

export const usersReducer = usersSlice.reducer;
