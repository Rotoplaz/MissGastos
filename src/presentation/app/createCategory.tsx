import { CategoryForm } from "../categories/components/CategoryForm";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";


export const CreateCategory = () => {

  return (
    <LayoutWithTopNavigation titleScreen="Crear Categoría">
        <CategoryForm category={null} />
    </LayoutWithTopNavigation>
  );
};

export default CreateCategory;

