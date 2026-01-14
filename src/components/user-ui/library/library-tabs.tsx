"use client";
import { useState } from "react";
import { Tabs, SimpleGrid } from "@chakra-ui/react";
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
    const result = await updateShelfById({
      shelfId,
      shelf: newShelfType,
    });

    console.log("Error =>", result);

    if (result.data?.data) {
      setData((prev) => {
        // Find the item in the current shelf
        const itemToMove = prev[currentShelfType].find(
          (item) => item._id === shelfId
        );
        if (!itemToMove) return prev;

        // Create the updated item
        const updatedItem: IShelf = {
          ...itemToMove,
          shelf: newShelfType,
        };

        return {
          ...prev,
          // Filter out the item from the old shelf array
          [currentShelfType]: prev[currentShelfType].filter(
            (item) => item._id !== shelfId
          ),
          // Add the updated item to the new shelf array
          [newShelfType]: [...prev[newShelfType], updatedItem],
        };
      });
    } else {
      toaster.create({
        type: "error",
        description: "Failed to update shelf type",
      });
    }
  };

  const handleUpdateProgress = async (
    id: string,
    currentShelfType: TShelfType,
    newPages: number
  ) => {
    const result = await updateShelfById({
      shelfId: id,
      pagesRead: newPages,
    });

    if (result.data?.data) {
      setData((prev) => ({
        ...prev,
        [currentShelfType]: prev[currentShelfType].map((item) =>
          item._id === id ? { ...item, pagesRead: newPages } : item
        ),
      }));
    } else {
      toaster.create({
        type: "error",
        description: "Failed to update pages",
      });
    }
  };

  return (
    <Tabs.Root
      defaultValue="currently_reading"
      variant="plain"
      colorPalette="yellow"
    >
      <Tabs.List bg="gray.100" p="1" borderRadius="2xl" mb="4">
        <Tabs.Trigger
          value="want_to_read"
          flex="1"
          borderRadius="xl"
          py="2"
          fontSize="xs"
          fontWeight="bold"
        >
          WANT ({data.want_to_read.length})
        </Tabs.Trigger>
        <Tabs.Trigger
          value="currently_reading"
          flex="1"
          borderRadius="xl"
          py="2"
          fontSize="xs"
          fontWeight="bold"
        >
          READING ({data.currently_reading.length})
        </Tabs.Trigger>
        <Tabs.Trigger
          value="read"
          flex="1"
          borderRadius="xl"
          py="2"
          fontSize="xs"
          fontWeight="bold"
        >
          FINISHED ({data.read.length})
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="want_to_read">
        <SimpleGrid columns={1} gap="4">
          {data.want_to_read.map((item) => (
            <ShelfCard
              key={item._id}
              item={item}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>

      <Tabs.Content value="currently_reading">
        <SimpleGrid columns={1} gap="4">
          {data.currently_reading.map((item) => (
            <ShelfCard
              key={item._id}
              item={item}
              onUpdateStatus={handleUpdateStatus}
              onUpdateProgress={handleUpdateProgress}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>

      <Tabs.Content value="read">
        <SimpleGrid columns={1} gap="4">
          {data.read.map((item) => (
            <ShelfCard
              key={item._id}
              item={item}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default LibraryTabs;
