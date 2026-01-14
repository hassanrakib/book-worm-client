"use client";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  Button,
  Group,
} from "@chakra-ui/react";
import { LuPlay, LuCheck, LuPlus, LuMinus } from "react-icons/lu";
import { IShelf, TShelfType } from "@/types/shelf";
import { ReadingProgress } from "./reading-progress";

interface ShelfCardProps {
  item: IShelf;
  onUpdateStatus: (
    id: string,
    currentStatus: TShelfType,
    newStatus: TShelfType
  ) => void;
  onUpdateProgress?: (
    id: string,
    currentShelfType: TShelfType,
    newPages: number
  ) => void;
}

const ShelfCard = ({
  item,
  onUpdateStatus,
  onUpdateProgress,
}: ShelfCardProps) => {
  const { book, pagesRead = 0, shelf, _id } = item;

  return (
    <Box
      p="4"
      borderRadius="3xl" // More organic, rounded feel
      bgGradient="to-br"
      gradientFrom="white"
      gradientTo="orange.50/30"
      borderWidth="1px"
      borderColor="gray.100"
      shadow="sm"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.3s ease"
    >
      <HStack gap="5" align="start">
        {/* Book Cover: Styled to look like it's leaning */}
        <Box
          width="90px"
          aspectRatio={3 / 4}
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
          shadow="xl"
          transform="rotate(-1deg)" // Subtle tilt for organic look
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            objectFit="cover"
            h="full"
            w="full"
          />
        </Box>

        {/* Content */}
        <VStack align="start" gap="3" flex="1" overflow="hidden">
          <Box>
            <Text
              fontSize="md"
              fontWeight="800"
              lineClamp={1}
              fontFamily="serif"
              color="gray.800"
              letterSpacing="tight"
            >
              {book.title}
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="600">
              by {book.author}
            </Text>
          </Box>

          {shelf === "currently_reading" && (
            <VStack width="full" gap="3" py="1">
              <ReadingProgress read={pagesRead} total={book.totalPages} />

              <Group attached width="full">
                <IconButton
                  bg="gray.400"
                  _hover={{ bg: "yellow.200" }}
                  onClick={() =>
                    onUpdateProgress?.(_id, shelf, Math.max(0, pagesRead - 5))
                  }
                  aria-label="Decrease"
                >
                  <LuMinus />
                </IconButton>
                <Box
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.50"
                  borderX="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="2xs" fontWeight="bold" color="gray.600">
                    UPDATE PAGE
                  </Text>
                </Box>
                <IconButton
                  bg="gray.400"
                  _hover={{ bg: "yellow.200" }}
                  onClick={() =>
                    onUpdateProgress?.(
                      _id,
                      shelf,
                      Math.min(book.totalPages, pagesRead + 5)
                    )
                  }
                  aria-label="Increase"
                >
                  <LuPlus />
                </IconButton>
              </Group>
            </VStack>
          )}

          {/* Action Area */}
          <Box width="full" pt={shelf === "read" ? 0 : 1}>
            {shelf === "want_to_read" && (
              <Button
                size="sm"
                width="full"
                bg="yellow.300"
                color="gray.900"
                fontWeight="bold"
                borderRadius="full"
                _hover={{ bg: "yellow.400", shadow: "inner" }}
                onClick={() => onUpdateStatus(_id, shelf, "currently_reading")}
              >
                <LuPlay /> Start Reading
              </Button>
            )}

            {shelf === "currently_reading" && (
              <Button
                size="sm"
                width="full"
                variant="outline"
                borderColor="gray.800"
                color="gray.800"
                borderRadius="full"
                _hover={{ bg: "gray.800", color: "white" }}
                onClick={() => onUpdateStatus(_id, shelf, "read")}
              >
                <LuCheck /> Complete Book
              </Button>
            )}

            {shelf === "read" && (
              <HStack
                bg="green.50"
                px="3"
                py="1"
                borderRadius="full"
                display="inline-flex"
                borderWidth="1px"
                borderColor="green.100"
              >
                <LuCheck size={12} color="green" />
                <Text fontSize="10px" color="green.700" fontWeight="bold">
                  FINISHED
                </Text>
              </HStack>
            )}
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ShelfCard;