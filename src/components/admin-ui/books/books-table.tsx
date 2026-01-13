"use client";

import { IBook } from "@/types/book"; // Adjust path as needed
import {
  Table,
  HStack,
  Image,
  Text,
  VStack,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

interface BooksTableProps {
  books: IBook[];
  onEdit: (book: IBook) => void;
  onDelete: (bookId: string) => void;
}

const BooksTable = ({ books, onEdit, onDelete }: BooksTableProps) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" maxW="full" bg="white">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row bg="yellow.300">
            <Table.ColumnHeader width="60px">#</Table.ColumnHeader>
            <Table.ColumnHeader width="80px">Cover</Table.ColumnHeader>
            <Table.ColumnHeader>Title & Author</Table.ColumnHeader>
            <Table.ColumnHeader>Genre</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" width="120px">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {books.map((book, index) => (
            <Table.Row key={book._id}>
              <Table.Cell>{index + 1}.</Table.Cell>

              <Table.Cell>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width="40px"
                  height="60px"
                  objectFit="cover"
                  rounded="sm"
                  shadow="sm"
                />
              </Table.Cell>

              <Table.Cell>
                <VStack align="start" gap="0">
                  <Text fontWeight="bold" lineClamp={1}>
                    {book.title}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    by {book.author}
                  </Text>
                </VStack>
              </Table.Cell>

              <Table.Cell>
                <Badge variant="subtle" colorPalette="blue" size="sm">
                  {book.category?.name || "Uncategorized"}
                </Badge>
              </Table.Cell>

              <Table.Cell textAlign="end">
                <HStack justify="flex-end" gap="2">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Edit book"
                    onClick={() => onEdit(book)}
                  >
                    <LuPencilLine />
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette="red"
                    aria-label="Delete book"
                    onClick={() => onDelete(book._id)}
                  >
                    <LuTrash2 />
                  </IconButton>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default BooksTable;
