import {create} from "zustand";

interface tokenType {
  token: string;
  setToken: (token:tokenType) => void;
  logout: () => void;
}

export const useAuthStore = create<tokenType>((set) => ({
  token: "",
  setToken: (token:tokenType) => set({token: token.token}),
  logout: () => set(() => ({ token: "" })),
}));

;