import { Box, VStack, Heading, Text, Container, Icon, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuSearchX, LuArrowLeft } from "react-icons/lu";
import StyledButton from "@/components/shared/styled-button";

export default function NotFound() {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      bg="#FDFCF8" // Parchment background
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background element */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        opacity="0.03"
        transform="rotate(15deg)"
        pointerEvents="none"
      >
        <LuSearchX size={600} />
      </Box>

      <Container maxW="xl">
        <VStack gap={6} textAlign="center">
          {/* Icon with a "lost" feel */}
          <Box 
            p={6} 
            bg="yellow.50" 
            borderRadius="full" 
            borderWidth="2px" 
            borderColor="yellow.100"
            color="yellow.600"
            shadow="inner"
          >
            <LuSearchX size={48} />
          </Box>

          <VStack gap={2}>
            <Heading 
              size="2xl" 
              fontFamily="serif" 
              color="gray.800"
              letterSpacing="tight"
            >
              The Page is Misplaced
            </Heading>
            <Text color="gray.600" fontSize="md" maxW="xs" fontStyle="italic">
              "Not all those who wander are lost, but this specific page definitely is."
            </Text>
          </VStack>

          <Text color="gray.500" fontSize="sm">
            It seems the book you are looking for has been checked out or moved to a different shelf.
          </Text>

          <Link href="/" passHref>
            <StyledButton 
              variant="solid" 
              colorPalette="yellow" 
              size="lg" 
              fontWeight="bold"
              px={8}
              borderRadius="full"
              shadow="md"
            >
              <LuArrowLeft /> Return to Main Hall
            </StyledButton>
          </Link>

          {/* Subtle footer breadcrumb */}
          <HStack gap={2} pt={4}>
            <Text fontSize="xs" fontWeight="bold" color="gray.300" letterSpacing="widest">
              ERR_CODE: 404_BOOK_NOT_ON_SHELF
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}