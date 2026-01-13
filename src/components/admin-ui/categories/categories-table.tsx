"use client";

import { toaster } from "@/components/ui/toaster";
import { useUpdateCategoryByIdMutation } from "@/redux/features/category/category.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { ICategory } from "@/types/category";
import { HStack, IconButton, Table, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

const CategoriesTable = ({
  initialCategories,
}: {
  initialCategories: ICategory[];
}) => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const [updateCategoryById, { isLoading, error }] =
    useUpdateCategoryByIdMutation();

  // Track which row is currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  // Temporary storage for the text while typing
  const [tempName, setTempName] = useState("");

  const handleEditClick = (id: string, currentName: string) => {
    setEditingId(id);
    setTempName(currentName);
  };

  const handleSave = async (id: string) => {
    const result = await updateCategoryById({ _id: id, name: tempName });

    if (result.data?.data) {
      // show optimistic update after success
      setCategories(
        categories.map((c) => (c._id === id ? { ...c, name: tempName } : c))
      );
      setEditingId(null);
    } else {
      toaster.create({
        type: "error",
        description: isFetchBaseQueryErrorWithData(error)
          ? error.data.message
          : "There was an error processing your request",
      });
    }
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
            const isEditing = editingId === category._id;

            return (
              <Table.Row key={category._id}>
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
                          onClick={() => handleSave(category._id)}
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
                          handleEditClick(category._id, category.name)
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
