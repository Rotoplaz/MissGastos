

import { Category } from '@/src/domain/entities/category.entity';
import { create } from 'zustand'


interface CategoryStoreState {
    categories: Category[];
    setCategories: (categories: Category[]) => Category[];
    addCategory: (category:Category) => Category[];
    updateCategory: (category:Category) => Category[];
}

const initialData = {
    categories: []
}

export const useCategoryStore = create<CategoryStoreState>()((set,get)=>({
    ...initialData,
    setCategories: (categories: Category[]) => {
        set({categories});
        return get().categories;
    },
    addCategory: (expense: Category) => {
        const categoriesList = get().categories;
        set({categories: [...categoriesList, expense]});
        return get().categories;
    },
    updateCategory: (category:Category) => {
        const categoriesList = get().categories;
        const newCategories = categoriesList.filter(categoryInStore => categoryInStore.id ===category.id);

        set({categories: newCategories});

        return newCategories;
    }
}));