import RecommendedBooks from "@/components/user-ui/home/recommended-books";
import { VStack } from "@chakra-ui/react";

const Home = async () => {
  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <RecommendedBooks />
    </VStack>
  );
};

export default Home;
