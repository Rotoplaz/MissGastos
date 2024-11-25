import { DeleteCategoryUseCase } from "@/src/application/use-cases/category/delete-category.use-case";
import { CategoryRepositoryImpl } from "@/src/infrastructure";
import { Button } from "@ui-kitten/components";


interface Props {
    id: number;
}

export const DeleteButtonCategory = ({ id }:Props) => {

    const deleteCategory = () => {
        const repository = new CategoryRepositoryImpl();
        new DeleteCategoryUseCase(repository).execute(id)
    }

  return (
    <Button onPress={deleteCategory}>Borrar Categoria</Button>
  )
}
