"use client";

import AddBookFormDrawer from "@/components/admin-ui/books/add-book-form-drawer";
import BooksTable from "@/components/admin-ui/books/books-table";
import StyledButton from "@/components/shared/styled-button";
import { useGetBooksQuery } from "@/redux/features/book/book.api";
import { IBook } from "@/types/book";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

const Books = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const [selectedBookToEdit, setSelectedBookToEdit] = useState<IBook | null>(null);

  const { data: booksResponse } = useGetBooksQuery(undefined);

  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if(booksResponse?.data) {
      setBooks(booksResponse.data);
    } else {
      setBooks([])
    }
  }, [booksResponse?.data])


  const handleOpenEditDrawer = (book: IBook) => {
    setSelectedBookToEdit(book);
    setIsEditDrawerOpen(true);
  }

  const handleCloseEditDrawer = () => {
    setSelectedBookToEdit(null);
    setIsEditDrawerOpen(true);
  }

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
        <BooksTable
          books={books}
          onEdit={handleOpenEditDrawer}
          onDelete={() => {}}
        />
      </VStack>
      {/* add book drawer */}
      <AddBookFormDrawer
        setBooks={setBooks}
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />
    </>
  );
};

export default Books;
