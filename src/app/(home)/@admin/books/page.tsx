"use client";

import AddBookFormDrawer from "@/components/admin-ui/books/add-book-form-drawer";
import BooksTable from "@/components/admin-ui/books/books-table";
import EditBookFormDrawer from "@/components/admin-ui/books/edit-book-form-drawer";
import StyledButton from "@/components/shared/styled-button";
import { toaster } from "@/components/ui/toaster";
import {
  useDeleteBookByIdMutation,
  useGetBooksQuery,
} from "@/redux/features/book/book.api";
import { IBook } from "@/types/book";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

const Books = () => {
  const [deleteBookById] = useDeleteBookByIdMutation();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [selectedBookToEdit, setSelectedBookToEdit] = useState<IBook | null>(
    null
  );

  const { data: booksResponse } = useGetBooksQuery(undefined);

  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (booksResponse?.data) {
      setBooks(booksResponse.data);
    } else {
      setBooks([]);
    }
  }, [booksResponse?.data]);

  const handleOpenEditDrawer = (book: IBook) => {
    setSelectedBookToEdit(book);
  };

  const handleCloseEditDrawer = () => {
    setSelectedBookToEdit(null);
  };

  const handleDeleteBook = async (bookId: string) => {
    const result = await deleteBookById({ bookId });

    // after successful submission
    if (result.data?.data) {
      // show a ui feedback
      toaster.create({
        type: "info",
        description: "Successfully deleted book",
      });
      // optimistic update
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } else {
      // show a ui feedback
      toaster.create({
        type: "error",
        description: "Failed to delete book",
      });
    }
  };

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
          onDelete={handleDeleteBook}
        />
      </VStack>
      {/* add book drawer */}
      <AddBookFormDrawer
        setBooks={setBooks}
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />
      {/* edit book drawer */}
      {selectedBookToEdit && (
        <EditBookFormDrawer
          setBooks={setBooks}
          isOpen={!!selectedBookToEdit}
          selectedBookToEdit={selectedBookToEdit}
          onClose={handleCloseEditDrawer}
        />
      )}
    </>
  );
};

export default Books;
