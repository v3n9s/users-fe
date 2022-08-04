import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '../types/alert';

type PartialAlertRequiredText = Pick<Alert, 'text'> & Partial<Alert>;

const initialState: Alert[] = [];

const getUniqueId = (() => {
  let id = 0;
  return () => `${Date.now()}${id = (id + 1) % 10000}`;
})();

const delay = (ms: number) => new Promise<void>((res) => {
  setTimeout(() => res(), ms);
});

export const showAlert = createAsyncThunk(
  'alerts/showAlert',
  async ({ text, ms = 3000, ...alert }: PartialAlertRequiredText & {ms?: number}, thunkAPI) => {
    const id = getUniqueId();
    thunkAPI.dispatch(addAlert({id, text, ...alert}));
    await delay(ms);
    thunkAPI.dispatch(removeAlert(id));
  }
);

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<PartialAlertRequiredText>) => {
      state.push({
        id: getUniqueId(),
        variant: 'primary',
        ...action.payload
      });
    },
    removeAlert: (state, action: PayloadAction<Alert['id']>) => {
      return state.filter(({id}) => id !== action.payload);
    }
  }
});

export const { addAlert, removeAlert } = alertsSlice.actions;

export const alertsReducer = alertsSlice.reducer;
