import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  HStack,
  Container,
} from "@chakra-ui/react";
import { LuBook, LuUsers, LuClock, LuChevronRight } from "react-icons/lu";
import Link from "next/link";
import { getAdminDashboardOverview } from "@/services/overview";

const AdminDashboardPage = async () => {
  const res = await getAdminDashboardOverview();
  const stats = res.data;

  // Store data only, not components/functions
  const cards = [
    {
      id: "books",
      label: "Total Books",
      value: stats?.totalBooks || 0,
      href: "/admin/manage-books",
      color: "blue.600",
      bg: "blue.50",
      description: "Manage catalog and inventory",
    },
    {
      id: "users",
      label: "Platform Users",
      value: stats?.totalUsers || 0,
      href: "/admin/manage-users",
      color: "purple.600",
      bg: "purple.50",
      description: "Active community members",
    },
    {
      id: "reviews",
      label: "Pending Reviews",
      value: stats?.pendingReviewsCount || 0,
      href: "/admin/manage-reviews",
      color: "orange.600",
      bg: "orange.50",
      description: "Awaiting moderation",
      highlight: (stats?.pendingReviewsCount || 0) > 0,
    },
  ];

  return (
    <Container maxW="xl" py="10" px="4">
      <VStack align="stretch" gap="8">
        <Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="yellow.600"
            textTransform="uppercase"
            letterSpacing="widest"
            mb="1"
          >
            Admin Dashboard
          </Text>
          <Heading size="xl" letterSpacing="tight">
            Overview
          </Heading>
        </Box>

        <SimpleGrid columns={1} gap="4">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                p="5"
                bg="white"
                borderWidth="1px"
                borderRadius="2xl"
                shadow="sm"
                transition="all 0.2s"
                _hover={{
                  shadow: "md",
                  transform: "translateY(-2px)",
                  borderColor: card.color,
                }}
                position="relative"
              >
                <HStack justify="space-between" align="center">
                  <HStack gap="4">
                    <Box p="3" bg={card.bg} borderRadius="xl">
                      {/* Render icons conditionally based on ID instead of passing as prop */}
                      {card.id === "books" && (
                        <LuBook size={24} color={card.color} />
                      )}
                      {card.id === "users" && (
                        <LuUsers size={24} color={card.color} />
                      )}
                      {card.id === "reviews" && (
                        <LuClock size={24} color={card.color} />
                      )}
                    </Box>
                    <VStack align="start" gap="0">
                      <Text
                        fontSize="2xs"
                        fontWeight="bold"
                        color="fg.muted"
                        textTransform="uppercase"
                      >
                        {card.label}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2">
                        {card.value.toLocaleString()}
                      </Text>
                      <Text fontSize="xs" color="fg.subtle">
                        {card.description}
                      </Text>
                    </VStack>
                  </HStack>
                  {/* Render Icon directly here */}
                  <LuChevronRight color="#CBD5E0" />
                </HStack>

                {card.highlight && (
                  <Box
                    position="absolute"
                    top="3"
                    right="3"
                    w="2"
                    h="2"
                    bg="red.500"
                    borderRadius="full"
                  />
                )}
              </Box>
            </Link>
          ))}
        </SimpleGrid>

        <Box
          p="4"
          bg="gray.50"
          borderRadius="xl"
          borderWidth="1px"
          borderStyle="dashed"
        >
          <Text fontSize="xs" color="fg.muted" textAlign="center">
            Tip: Click on a card to navigate to the detailed management view.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminDashboardPage;
