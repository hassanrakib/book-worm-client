import RecommendedBooks from "@/components/user-ui/home/recommended-books";
import UserStats from "@/components/user-ui/home/user-stats";
import { VStack } from "@chakra-ui/react";

const Home = async () => {
  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <UserStats />
      <RecommendedBooks />
    </VStack>
  );
};

export default Home;
