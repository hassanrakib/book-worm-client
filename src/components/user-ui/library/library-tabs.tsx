"use client";
import { useState } from "react";
import { Tabs, SimpleGrid, Box, Text } from "@chakra-ui/react";
import ShelfCard from "./shelf-card";
import { IShelf, TShelfType } from "@/types/shelf";
import { useUpdateShelfByIdMutation } from "@/redux/features/shelf/shelf.api";
import { toaster } from "@/components/ui/toaster";

interface LibraryProps {
  initialData: {
    want_to_read: IShelf[];
    currently_reading: IShelf[];
    read: IShelf[];
  };
}

const LibraryTabs = ({ initialData }: LibraryProps) => {
  const [data, setData] = useState(initialData);
  const [updateShelfById] = useUpdateShelfByIdMutation();

  const handleUpdateStatus = async (
    shelfId: string,
    currentShelfType: TShelfType,
    newShelfType: TShelfType
  ) => {
    const result = await updateShelfById({ shelfId, shelf: newShelfType });
    if (result.data?.data) {
      setData((prev) => {
        const itemToMove = prev[currentShelfType].find(
          (item) => item._id === shelfId
        );
        if (!itemToMove) return prev;
        const updatedItem: IShelf = { ...itemToMove, shelf: newShelfType };
        return {
          ...prev,
          [currentShelfType]: prev[currentShelfType].filter(
            (item) => item._id !== shelfId
          ),
          [newShelfType]: [...prev[newShelfType], updatedItem],
        };
      });
    } else {
      toaster.create({ type: "error", description: "Failed to update shelf" });
    }
  };

  const handleUpdateProgress = async (
    id: string,
    currentShelfType: TShelfType,
    newPages: number
  ) => {
    const result = await updateShelfById({ shelfId: id, pagesRead: newPages });
    if (result.data?.data) {
      setData((prev) => ({
        ...prev,
        [currentShelfType]: prev[currentShelfType].map((item) =>
          item._id === id ? { ...item, pagesRead: newPages } : item
        ),
      }));
    } else {
      toaster.create({ type: "error", description: "Failed to update pages" });
    }
  };

  return (
    <Tabs.Root defaultValue="currently_reading" variant="plain">
      {/* Styled as a polished wooden shelf */}
      <Tabs.List
        bg="gray.400"
        p="1.5"
        borderRadius="xl"
        mb="6"
        shadow="lg"
        borderBottom="4px solid"
        borderColor="yellow.300"
      >
        <Tabs.Trigger
          value="want_to_read"
          flex="1"
          borderRadius="lg"
          py="2"
          fontSize="xs"
          fontWeight="bold"
          color="whiteAlpha.800"
          _selected={{ bg: "yellow.300", color: "gray.900" }}
          transition="all 0.2s"
        >
          WISHLIST ({data.want_to_read.length})
        </Tabs.Trigger>
        <Tabs.Trigger
          value="currently_reading"
          flex="1"
          borderRadius="lg"
          py="2"
          fontSize="xs"
          fontWeight="bold"
          color="whiteAlpha.800"
          _selected={{ bg: "yellow.300", color: "gray.900" }}
          transition="all 0.2s"
        >
          READING ({data.currently_reading.length})
        </Tabs.Trigger>
        <Tabs.Trigger
          value="read"
          flex="1"
          borderRadius="lg"
          py="2"
          fontSize="xs"
          fontWeight="bold"
          color="whiteAlpha.800"
          _selected={{ bg: "yellow.300", color: "gray.900" }}
          transition="all 0.2s"
        >
          ARCHIVE ({data.read.length})
        </Tabs.Trigger>
      </Tabs.List>

      {Object.entries(data).map(([key, list]) => (
        <Tabs.Content key={key} value={key} mt="0">
          <SimpleGrid columns={1} gap="4">
            {list.map((item) => (
              <ShelfCard
                key={item._id}
                item={item}
                onUpdateStatus={handleUpdateStatus}
                onUpdateProgress={
                  key === "currently_reading" ? handleUpdateProgress : undefined
                }
              />
            ))}
            {list.length === 0 && (
              <Box
                textAlign="center"
                py="12"
                px="4"
                borderWidth="1px"
                borderStyle="dashed"
                borderRadius="2xl"
              >
                <Text color="gray.500" fontSize="sm">
                  This shelf is currently empty.
                </Text>
              </Box>
            )}
          </SimpleGrid>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default LibraryTabs;
