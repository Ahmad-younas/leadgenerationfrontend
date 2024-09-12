// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {AuthState} from './authSlice';
import {loadState,saveState} from '../utils/locakStorage';
interface RootStates {
  auth: AuthState; // State shape includes the AuthState under the auth key
}
const preloadedState: RootStates | undefined = loadState();
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
