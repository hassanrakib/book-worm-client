"use client";

import {
  Container,
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Separator,
  Center,
} from "@chakra-ui/react";
import AddTutorialForm from "@/components/admin-ui/tutorials/add-tutorial-form";
import TutorialCard from "@/components/shared/tutorial-card";
import { useGetTutorialsQuery } from "@/redux/features/tutorial/tutorial.api";
import { ITutorial } from "@/types/tutorial";
import { useEffect, useState } from "react";

const TutorialsPage = () => {
  const { data, isLoading } = useGetTutorialsQuery(undefined);

  const [tutorials, setTutorials] = useState<ITutorial[]>([]);

  // Sync state only when the initial data arrives
  useEffect(() => {
    if (data?.data) {
      setTutorials(data.data);
    }
  }, [data]);

  return (
    <Center w="100%">
      <Container maxW="xl" py="10" px="4">
        <VStack gap="8" align="stretch">
          {/* Form Section */}
          <AddTutorialForm setTutorials={setTutorials} />

          <Separator />

          {/* List Section */}
          <VStack align="stretch" gap="6">
            <Box>
              <Heading size="lg">Tutorials & Reviews</Heading>
            </Box>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                {/* Simple manual skeleton logic or just a loading text */}
                <Box h="200px" bg="bg.muted" borderRadius="xl" />
                <Box h="200px" bg="bg.muted" borderRadius="xl" />
              </SimpleGrid>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
                {tutorials.map((tutorial: ITutorial) => (
                  <TutorialCard key={tutorial._id} tutorial={tutorial} />
                ))}
              </SimpleGrid>
            )}

            {!isLoading && tutorials.length === 0 && (
              <Center
                p="10"
                border="1px dashed"
                borderColor="border.subtle"
                borderRadius="xl"
              >
                <Text color="fg.muted">
                  No videos found. Add your first tutorial above!
                </Text>
              </Center>
            )}
          </VStack>
        </VStack>
      </Container>
    </Center>
  );
};

export default TutorialsPage;
