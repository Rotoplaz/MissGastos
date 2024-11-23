import { Category } from "@/src/domain/entities/category.entity";
import { CategoryMemoryImpl } from "@/src/infrastructure/category/category-memory.repository.impl";



describe("Category Repository Memory", () => {

    let categoryRepository: CategoryMemoryImpl;

    beforeEach(() => {
        categoryRepository = new CategoryMemoryImpl();
    });

    test("should create one",async ()=>{
        const newCategoryData: Omit<Category, "id"> = {
            icon: "Engine",
            type: "Electronics",
            color: "#fff"
        };

        const createdCategory = await categoryRepository.createCategory(newCategoryData);

        expect(createdCategory).toEqual({
            id: 1,
            icon: "Engine",
            type: "Electronics",
            color: "#fff"
        });

    });

    test("should return a category by id", async () => {
        const newCategory = await categoryRepository.createCategory({
            type: "Books",
            icon: "library",
            color: "#fff"
        });
    
        const foundCategory = await categoryRepository.getCategoryById(newCategory.id);
    
        expect(foundCategory).toEqual(newCategory);
    });
    
    test("should return null if category not found", async () => {
        const foundCategory = await categoryRepository.getCategoryById(999);
        expect(foundCategory).toBeNull();
    });

    test("should delete a category", async ()=>{
        
        await categoryRepository.createCategory({
            type: "Books",
            icon: "library",
            color: "#fff"
        });

        await categoryRepository.deleteCategory(1);

        const allCategories = await categoryRepository.getAllCategories();
        
        expect(allCategories).toHaveLength(0);

    });

    test("should update a category", async () => {
        const category = await categoryRepository.createCategory({
            type: "Books",
            icon: "library",
            color: "#fff"
        });

        await categoryRepository.updateCategory(category.id, {
            type: "Electronic",
        });

        const categoryTypeUpdated = await categoryRepository.getCategoryById(1);

        expect(categoryTypeUpdated).toEqual({
                id: 1,
                type: "Electronic",
                icon: "library",
                color: "#fff"
        });

        await categoryRepository.updateCategory(category.id, {
            type: "Electronic",
            icon: "engine"
        });

        const categoryAllUpated = await categoryRepository.getCategoryById(1);

        expect(categoryAllUpated).toEqual({
                id: 1,
                type: "Electronic",
                icon: "engine",
                color: "#fff"
        });

    });

    test("should trhow error if category to update not found", async () => {

        await expect(categoryRepository.updateCategory(12333, {
            type: "Electronic",
            icon: "engine"
        })).rejects.toThrow("Category with id: 12333 not found")


    });
});