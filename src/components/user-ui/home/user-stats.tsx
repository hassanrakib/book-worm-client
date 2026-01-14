import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import {
  LuBookOpen,
  LuLibrary,
  LuStar,
  LuPenLine,
  LuCheck,
} from "react-icons/lu";
import { getUserDashboardOverview } from "@/services/overview";

const UserStats = async () => {
  const res = await getUserDashboardOverview();

  const stats = res.data || {
    totalBooksInShelves: 0,
    totalBooksRead: 0,
    totalPagesRead: 0,
    totalReviewsGiven: 0,
    averageRatingGiven: 0,
  };

  // Keep data only in the array (no functions/components)
  const statItems = [
    {
      id: "shelves",
      label: "Books in Shelves",
      value: stats.totalBooksInShelves,
      color: "blue.500",
      bg: "blue.50",
    },
    {
      id: "completed",
      label: "Completed",
      value: stats.totalBooksRead,
      color: "green.500",
      bg: "green.50",
    },
    {
      id: "reviews",
      label: "Total Reviews",
      value: stats.totalReviewsGiven,
      color: "purple.500",
      bg: "purple.50",
    },
    {
      id: "rating",
      label: "Avg Rating",
      value: stats.averageRatingGiven,
      color: "yellow.500",
      bg: "yellow.50",
    },
  ];

  return (
    <VStack align="stretch" gap="5" py="4">
      <Box>
        <Heading size="md" letterSpacing="tight">
          Welcome back!
        </Heading>
        <Text fontSize="xs" color="fg.muted">
          Here is your reading journey at a glance.
        </Text>
      </Box>

      {/* Main Feature Stat: Total Pages Read */}
      <Box
        p="5"
        bgGradient="to-br"
        gradientFrom="yellow.400"
        gradientTo="yellow.600"
        borderRadius="3xl"
        color="black"
        shadow="md"
        position="relative"
        overflow="hidden"
      >
        <VStack align="start" gap="0">
          <HStack gap="2" mb="1">
            {/* Render Icon directly instead of using 'as' prop */}
            <LuBookOpen size={16} />
            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
              Total Progress
            </Text>
          </HStack>
          <Text fontSize="4xl" fontWeight="black" lineHeight="1">
            {stats.totalPagesRead.toLocaleString()}
          </Text>
          <Text fontSize="sm" fontWeight="medium" opacity="0.9">
            Pages read across all books
          </Text>
        </VStack>
        {/* Decorative background icon rendered directly */}
        <Box
          position="absolute"
          right="-10%"
          bottom="-10%"
          opacity="0.1"
          transform="rotate(-15deg)"
        >
          <LuBookOpen size={120} />
        </Box>
      </Box>

      {/* Secondary Stats Grid */}
      <SimpleGrid columns={2} gap="3">
        {statItems.map((item) => (
          <Box
            key={item.label}
            p="4"
            bg="white"
            borderWidth="1px"
            borderRadius="2xl"
            shadow="sm"
          >
            <HStack gap="3">
              <Box p="2" bg={item.bg} borderRadius="lg">
                {/* Conditionals to render icons directly */}
                {item.id === "shelves" && (
                  <LuLibrary size={20} color={item.color} />
                )}
                {item.id === "completed" && (
                  <LuCheck size={20} color={item.color} />
                )}
                {item.id === "reviews" && (
                  <LuPenLine size={20} color={item.color} />
                )}
                {item.id === "rating" && (
                  <LuStar size={20} color={item.color} />
                )}
              </Box>
              <VStack align="start" gap="0">
                <Text fontSize="xl" fontWeight="bold" lineHeight="1.1">
                  {item.value}
                </Text>
                <Text
                  fontSize="10px"
                  color="fg.muted"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {item.label}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default UserStats;
