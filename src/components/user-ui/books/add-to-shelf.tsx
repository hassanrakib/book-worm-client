import StyledButton from "@/components/shared/styled-button";
import { LuLibrary } from "react-icons/lu";

const AddToShelf = ({ bookId }: { bookId: string }) => {
  return (
    <StyledButton flex="1" size="lg">
      <LuLibrary /> Add to Shelf
    </StyledButton>
  );
};

export default AddToShelf;
