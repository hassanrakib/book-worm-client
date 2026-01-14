import CategoriesTable from "@/components/admin-ui/categories/categories-table";
import CreateCategoryForm from "@/components/admin-ui/categories/create-category-form";
import { getCategories } from "@/services/category";
import { VStack } from "@chakra-ui/react";

const Categories = async () => {

  const categories = await getCategories();

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="3.5">
      <CreateCategoryForm />
      <CategoriesTable initialCategories={categories.data || []} />
    </VStack>
  );
};

export default Categories;
