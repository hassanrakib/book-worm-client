import CategoriesTable from "@/components/admin-ui/categories/categories-table";
import CreateCategoryForm from "@/components/admin-ui/categories/create-category-form";
import { VStack } from "@chakra-ui/react";

const Categories = async () => {
  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="3.5">
      <CreateCategoryForm />
      <CategoriesTable />
    </VStack>
  );
};

export default Categories;
