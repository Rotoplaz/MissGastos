import React, { useEffect, useState } from 'react'
import { LayoutWithTopNavigation } from '../common/layouts/LayoutWithTopNavigation';
import { useLocalSearchParams } from 'expo-router';
import { Category } from '@/src/domain/entities/category.entity';
import { CategoryRepositoryImpl } from '@/src/infrastructure';
import { GetCategoryByIdUseCase } from '@/src/application/use-cases/category/get-category-by-id.use-case';
import { FullLoaderScreen } from '../common/screens/loaders/FullLoaderScreen';
import { CategoryForm } from '../categories/components/CategoryForm';


export const categoryInformation = () => {
    const params = useLocalSearchParams<{ id: string }>();
    const [category, setCategory] = useState<Category |null >(null);

    useEffect(()=>{
        const getCategory = async () => {
            const repository = new CategoryRepositoryImpl();
            const category = await new GetCategoryByIdUseCase(repository).execute(+params.id);
            setCategory(category);
        }
        getCategory();
    },[]);
    
    if (!category) {
        return (
            <LayoutWithTopNavigation titleScreen=''>
                <FullLoaderScreen />
            </LayoutWithTopNavigation>
        )
    }

  return (
    <LayoutWithTopNavigation titleScreen={category.type}>
        <CategoryForm category={category} />
    </LayoutWithTopNavigation>
  )
}

export default categoryInformation;
