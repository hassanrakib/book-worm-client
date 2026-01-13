import FormDrawer from "@/components/form/form-drawer";
import { createBookSchema } from "@/schemas/book";
import { IBook } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReset } from "react-hook-form";

type IFormValues = Omit<
  IBook,
  "avgRating" | "reviewCount" | "shelfCount" | "category" | "coverImage"
> & {
  category: string;
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
    category: "",
    description: "",
  };

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
      title: "",
      author: "",
      coverImage: [],
      category: "",
      description: "",
    };

    // 3. Append the stringified data as a text field named 'data'
    formData.append("data", JSON.stringify(bookData));

    // const result = await registerUser(formData);

    // after successful submission
    // if (result.data?.data) {
    // reset the form
    // reset(defaultValues);
    // show a ui feedback
    // toaster.create({ type: "info", description: "Successfully signed up" });

    // redirect user to the signin page
    // router.push("/signin");
    // }
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
      isLoading={false}
      isOpen={isOpen}
      submitError={undefined}
    >
      here is your children inputs
    </FormDrawer>
  );
};

export default AddBookFormDrawer;
