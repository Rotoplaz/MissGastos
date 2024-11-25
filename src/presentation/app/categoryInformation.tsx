import React, { useEffect, useState } from "react";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { router, useLocalSearchParams } from "expo-router";
import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepositoryImpl } from "@/src/infrastructure";
import { GetCategoryByIdUseCase } from "@/src/application/use-cases/category/get-category-by-id.use-case";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";
import { CategoryForm } from "../categories/components/CategoryForm";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { DeleteCategoryUseCase } from "@/src/application/use-cases/category/delete-category.use-case";
import { useCategoryStore } from "../store/categories/useCategoryStore";
import { Alert } from "react-native";

export const categoryInformation = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
    const deleteCategoryStore = useCategoryStore(state=>state.deleteCategory);
  useEffect(() => {
    const getCategory = async () => {
      const repository = new CategoryRepositoryImpl();
      const category = await new GetCategoryByIdUseCase(repository).execute(
        +params.id
      );
      setCategory(category);
    };
    getCategory();
  }, []);

  if (!category) {
    return (
      <LayoutWithTopNavigation titleScreen="">
        <FullLoaderScreen />
      </LayoutWithTopNavigation>
    );
  }

  const deleteCategory = () => {

    Alert.alert(
        "Cuidado",
        "¿Seguro de eliminar la categoria",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            style: "destructive",
            onPress: async () => {
              try {
                const repository = new CategoryRepositoryImpl();
                new DeleteCategoryUseCase(repository).execute(category.id);
            
                deleteCategoryStore(category);
                router.back();
              } catch (error) {
                console.error("Error while deleting database:", error);

              }
            },
          },
        ]
      );

    }


  return (
    <LayoutWithTopNavigation
      titleScreen={category.type}
      accessoryRight={()=>
        <TopNavigationAction onPress={deleteCategory} icon={<Icon name="trash-outline" fill="red" />} />
      }
    >
      <CategoryForm category={category} />
    </LayoutWithTopNavigation>
  );
};

export default categoryInformation;
