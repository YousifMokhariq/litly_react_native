import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '../schemas/auth.schema';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  // Actions (Replacing your SessionManager methods)
  setLogin: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  // Replaces createLoginSession
  setLogin: async (user, token) => {
    await SecureStore.setItemAsync('userToken', token);
    set({ user, token, isLoggedIn: true });
  },

  // Replaces logout()
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    set({ user: null, token: null, isLoggedIn: false });
  },

  // Runs when the app starts to check if a session exists
  initializeAuth: async () => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      // In a real app, you'd fetch the user profile here using the token
      set({ token, isLoggedIn: true });
    }
  },
}));