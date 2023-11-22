import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    set => ({
      user: null,
      token: '',
      isAuth: false,
      setUser: (user) => set(state => ({ user })),
      setToken: (token) =>
        set(state => ({
          token,
        })),
      setAuth: (isAuth) => set(state => ({ isAuth })),
      clearUser: () =>
        set(state => ({
          isAuth: false,
          place: '',
          token: '',
          user: null,
        })),
    }),
    { name: 'auth', storage: createJSONStorage(() => AsyncStorage) },
  ),
);