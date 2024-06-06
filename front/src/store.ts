import { create } from "zustand";

type AuthState = {
  token: string | null;
  storeToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  storeToken: (token) => set({ token }),
}));
