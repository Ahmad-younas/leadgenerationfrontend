// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Correct import

// Interface for the decoded token
interface DecodedToken {
  id: string;
  email: string;
  role: 'admin' | 'employee';
}

// User interface
interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
}

// Auth state interface
export interface AuthState {
  user: User | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login reducer that accepts a token
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload; // Token is passed in via the action payload
      localStorage.setItem('authToken', token); // Save token to localStorage

      try {
        if (token) {
          // Decode the token
          const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
          console.log("DecodedToken", decoded);

          // Set the user object with decoded data
          state.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          };
        }
      } catch (error) {
        console.error('Invalid token:', error);
        state.user = null;
        localStorage.removeItem('authToken'); // Clear token from localStorage if invalid
      }
    },
    // Logout reducer
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('authToken'); // Remove token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
