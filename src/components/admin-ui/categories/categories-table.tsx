"use client";

import { HStack, IconButton, Table, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuCheck, LuPencilLine, LuX, LuTrash2 } from "react-icons/lu";

const initialCategories = [
  { id: 1, name: "Sci-Fi" },
  { id: 2, name: "Fantasy" },
  { id: 3, name: "Horror" },
];

const CategoriesTable = () => {
  const [categories, setCategories] = useState(initialCategories);
  // Track which row is currently being edited
  const [editingId, setEditingId] = useState<number | null>(null);
  // Temporary storage for the text while typing
  const [tempName, setTempName] = useState("");

  const handleEditClick = (id: number, currentName: string) => {
    setEditingId(id);
    setTempName(currentName);
  };

  const handleSave = (id: number) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name: tempName } : c))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempName("");
  };

  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" maxW="xl" bg="white">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row bg="yellow.300">
            <Table.ColumnHeader width="60px">#</Table.ColumnHeader>
            <Table.ColumnHeader>Category Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" width="120px">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {categories.map((category, index) => {
            const isEditing = editingId === category.id;

            return (
              <Table.Row key={category.id}>
                <Table.Cell>{index + 1}.</Table.Cell>

                <Table.Cell>
                  {isEditing ? (
                    <Input
                      size="sm"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    category.name
                  )}
                </Table.Cell>

                <Table.Cell textAlign="end">
                  <HStack justify="flex-end" gap="2">
                    {isEditing ? (
                      <>
                        <IconButton
                          variant="outline"
                          size="xs"
                          colorPalette="green"
                          onClick={() => handleSave(category.id)}
                        >
                          <LuCheck />
                        </IconButton>
                        <IconButton
                          variant="outline"
                          size="xs"
                          colorPalette="red"
                          onClick={handleCancel}
                        >
                          <LuX />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        variant="ghost"
                        size="xs"
                        onClick={() =>
                          handleEditClick(category.id, category.name)
                        }
                      >
                        <LuPencilLine />
                      </IconButton>
                    )}
                  </HStack>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default CategoriesTable;
