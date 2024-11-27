import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

type Themes = "dark" | "light";

interface ThemeStoreState {
  theme: Themes;
  toggleTheme: () => void;
}

// Adaptador para cumplir con los tipos de PersistStorage
const asyncStorageAdapter: PersistStorage<ThemeStoreState> = {
  getItem: async (name) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      theme: "light", // Valor inicial
      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme-storage", // Clave en AsyncStorage
      storage: asyncStorageAdapter, // Usar el adaptador personalizado
    }
  )
);
