
import { create } from 'zustand'


type themes = "dark" | "light";

interface ThemeStoreState {
    theme: themes
    toggleTheme: ()=> void;
}


export const useThemeStore = create<ThemeStoreState>()((set,get)=>({
 theme: "light",
 toggleTheme: () => {
    set({theme: get().theme === "dark" ? "light" : "dark"});
 }
}));