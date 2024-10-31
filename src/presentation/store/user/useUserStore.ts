import { User } from '@/src/domain/entities/user.entity'
import { create } from 'zustand'


interface UserStoreState {
    user: User | null;
    setUser: (user: User | null)=>void;
    resetUserStore: ()=>void;
}

const initialData = {
    user: null
}

export const useUserStore = create<UserStoreState>()((set)=>({
    ...initialData,
    setUser: (user: User | null)=>{
        set({user});
    },
    resetUserStore: () => {
        set({ ...initialData });
    }
}));