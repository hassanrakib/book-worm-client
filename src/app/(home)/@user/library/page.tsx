import LibraryTabs from "@/components/user-ui/library/library-tabs";
import { getBooksOfShelvesByUser } from "@/services/shelf";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default async function MyLibrary() {
  // Fetch shelves data
  const response = await getBooksOfShelvesByUser();
  const shelves = response?.data;

  const initialData = shelves || {
    want_to_read: [],
    currently_reading: [],
    read: [],
  };

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <Box>
        <Heading size="xl" mb="1" letterSpacing="tight">
          My Library
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Manage your personal book collections.
        </Text>
      </Box>
      <LibraryTabs initialData={initialData} />
    </VStack>
  );
}
