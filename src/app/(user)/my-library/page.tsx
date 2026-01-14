import LibraryTabs from "@/components/user-ui/library/library-tabs";
import { getBooksOfShelvesByUser } from "@/services/shelf";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default async function MyLibrary() {
  const response = await getBooksOfShelvesByUser();
  const shelves = response?.data;

  const initialData = shelves || {
    want_to_read: [],
    currently_reading: [],
    read: [],
  };

  return (
    // Added a very subtle "paper" tint to the background
    <Box bg="orange.50/30" minH="100vh">
      <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
        <Box borderLeft="4px solid" borderColor="yellow.400" pl="4">
          <Heading
            size="xl"
            mb="1"
            letterSpacing="tight"
            fontFamily="serif" // Classic book feel
            color="gray.800"
          >
            My Personal Library
          </Heading>
          <Text color="gray.600" fontSize="sm" fontStyle="italic">
            “So many books, so little time.”
          </Text>
        </Box>
        <LibraryTabs initialData={initialData} />
      </VStack>
    </Box>
  );
}
