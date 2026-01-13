import FileInput from "@/components/form/file-input";
import FormDrawer from "@/components/form/form-drawer";
import StyledInput from "@/components/form/styled-input";
import StyledNumberInput from "@/components/form/styled-number-input";
import StyledSelect from "@/components/form/styled-select";
import StyledTextArea from "@/components/form/styled-text-area";
import { toaster } from "@/components/ui/toaster";
import { useCreateBookMutation } from "@/redux/features/book/book.api";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { createBookSchema } from "@/schemas/book";
import { IBook } from "@/types/book";
import { createListCollection, SimpleGrid, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReset } from "react-hook-form";

type IFormValues = Omit<
  IBook,
  "avgRating" | "reviewCount" | "shelfCount" | "category" | "coverImage"
> & {
  category: string[];
  coverImage: File[];
};

interface AddBookFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookFormDrawer = ({ isOpen, onClose }: AddBookFormDrawerProps) => {
  // default values for the form
  const defaultValues: IFormValues = {
    title: "",
    author: "",
    coverImage: [],
    category: [],
    description: "",
    totalPages: 0,
  };

  const { data: categoriesResponse } = useGetCategoriesQuery(undefined);

  const categories = createListCollection({
    items:
      categoriesResponse?.data?.map((c) => ({ label: c.name, value: c._id })) ||
      [],
  });

  const [addBook, { isLoading, error }] = useCreateBookMutation();

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const formData = new FormData();

    // 1. Extract the file from the array
    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("image", data.coverImage[0]);
    }

    // 2. Prepare the text data (excluding the file)
    const bookData = {
      title: data.title,
      author: data.author,
      category: data.category[0],
      description: data.description,
      totalPages: data.totalPages,
    };

    // 3. Append the stringified data as a text field named 'data'
    formData.append("data", JSON.stringify(bookData));

    const result = await addBook(formData);

    // after successful submission
    if (result.data?.data) {
      // reset the form
      reset(defaultValues);
      // show a ui feedback
      toaster.create({ type: "info", description: "Successfully added book" });

      // close the drawer
      onClose();
    }
  };

  return (
    <FormDrawer
      title="Add Book"
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues,
        resolver: zodResolver(createBookSchema),
      }}
      handleClose={onClose}
      isLoading={isLoading}
      isOpen={isOpen}
      submitError={error}
    >
      <VStack gap="5" align="stretch">
        <FileInput name="coverImage" label="Cover Image" />
        <StyledInput type="text" name="title" placeholder="Enter book title" />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <StyledInput
            type="text"
            name="author"
            placeholder="Enter author name"
          />
          <StyledSelect
            name="category"
            placeholder="Select category"
            collection={categories}
          />
        </SimpleGrid>
        <StyledNumberInput
          name="totalPages"
          unit="page"
          placeholder="Enter total pages"
          min={0}
        />
        <StyledTextArea
          name="description"
          placeholder="Book description here..."
          rows={5}
        />
      </VStack>
    </FormDrawer>
  );
};

export default AddBookFormDrawer;
