"use client";

import AddBookFormDrawer from "@/components/admin-ui/books/add-book-form-drawer";
import StyledButton from "@/components/shared/styled-button";
import { IBook } from "@/types/book";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

const Books = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  return (
    <>
      <VStack alignItems="stretch" maxW="xl" mx="auto" gap="3.5">
        <HStack justify="space-between" align="center" width="full">
          <Box>
            <Heading size="xl">Manage Books</Heading>
          </Box>

          <StyledButton onClick={() => setIsAddDrawerOpen(true)}>
            <LuPlus /> Add Book
          </StyledButton>
        </HStack>
      </VStack>
      {/* add book drawer */}
      <AddBookFormDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />
    </>
  );
};

export default Books;
