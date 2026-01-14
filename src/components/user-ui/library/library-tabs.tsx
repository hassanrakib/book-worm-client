"use client";
import { useState } from "react";
import {  Tabs, SimpleGrid } from "@chakra-ui/react";
import ShelfCard from "./shelf-card";
import { IShelf } from "@/types/shelf";

interface LibraryProps {
  initialData: {
    want_to_read: IShelf[];
    currently_reading: IShelf[];
    read: IShelf[];
  };
}

const LibraryTabs = ({ initialData }: LibraryProps) => {
  const [data, setData] = useState(initialData);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    console.log(`Moving ${id} to ${newStatus}`);
    // Refresh logic here
  };

  const handleUpdateProgress = (id: string, newPages: number) => {
    console.log(`Updating progress for ${id} to ${newPages}`);
    // Refresh logic here
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
