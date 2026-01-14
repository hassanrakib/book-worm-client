"use client";

import StyledButton from "@/components/shared/styled-button";
import { toaster } from "@/components/ui/toaster";
import { useAddBookToShelfMutation } from "@/redux/features/shelf/shelf.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { useRouter } from "next/navigation";
import { LuLibrary } from "react-icons/lu";

const AddToShelf = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const [addToShelf, { error }] = useAddBookToShelfMutation();

  const handleAddToShelf = async () => {
    const result = await addToShelf({ book: bookId });

    if (result.data?.data) {
      // show a ui feedback
      toaster.create({ type: "info", description: "Book added to shelf" });

      // refresh the route
      router.refresh();
    } else {
      toaster.create({
        type: "error",
        description: isFetchBaseQueryErrorWithData(error)
          ? error.data.message
          : "There was an error processing your request",
      });
    }
  };

  return (
    <StyledButton onClick={handleAddToShelf} flex="1" size="lg">
      <LuLibrary /> Add to Shelf
    </StyledButton>
  );
};

export default AddToShelf;
