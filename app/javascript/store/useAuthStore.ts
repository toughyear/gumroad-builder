import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: localStorage.getItem("gumroadAccessToken") || null,
  setAccessToken: (token) => {
    localStorage.setItem("gumroadAccessToken", token);
    set({ accessToken: token });
  },
  removeAccessToken: () => {
    localStorage.removeItem("gumroadAccessToken");
    set({ accessToken: null });
  },
}));

export default useAuthStore;
