import { User } from '@/src/domain/entities/user.entity'
import { create } from 'zustand'


interface UserStoreState {
    user: User | null;
    setUser: (user: User | null)=>void;
}

export const useUserStore = create<UserStoreState>()((set)=>({
    user: null,
    setUser: (user: User | null)=>{
        set({user});
    }
}));