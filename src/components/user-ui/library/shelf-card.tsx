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
  onUpdateStatus: (id: string, currentStatus: TShelfType, newStatus: TShelfType) => void;
  onUpdateProgress?: (id: string, currentShelfType: TShelfType, newPages: number) => void;
}

const ShelfCard = ({
  item,
  onUpdateStatus,
  onUpdateProgress,
}: ShelfCardProps) => {
  const { book, pagesRead = 0, shelf, _id } = item;

  return (
    <Box p="3" borderWidth="1px" borderRadius="2xl" bg="white" shadow="sm">
      <HStack gap="4" align="start">
        {/* Book Cover */}
        <Box
          width="80px"
          aspectRatio={3 / 4}
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
          shadow="md"
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
        <VStack align="start" gap="2" flex="1" overflow="hidden">
          <Box>
            <Text fontSize="sm" fontWeight="bold" lineClamp={1}>
              {book.title}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              by {book.author}
            </Text>
          </Box>

          {shelf === "currently_reading" && (
            <VStack width="full" gap="2">
              <ReadingProgress read={pagesRead} total={book.totalPages} />
              <Group attached width="full">
                <IconButton
                  onClick={() =>
                    onUpdateProgress?.(_id, shelf, Math.max(0, pagesRead - 5))
                  }
                  aria-label="Decrease progress"
                >
                  <LuMinus />
                </IconButton>
                <Button flex="1" disabled>
                  Update Pages
                </Button>
                <IconButton
                  onClick={() =>
                    onUpdateProgress?.(
                      _id,
                      shelf,
                      Math.min(book.totalPages, pagesRead + 5)
                    )
                  }
                  aria-label="Increase progress"
                >
                  <LuPlus />
                </IconButton>
              </Group>
            </VStack>
          )}

          {/* Action Buttons */}
          <HStack width="full" mt="auto">
            {shelf === "want_to_read" && (
              <Button
                size="xs"
                width="full"
                colorPalette="yellow"
                onClick={() => onUpdateStatus(_id, shelf, "currently_reading")}
              >
                <LuPlay /> Start Reading
              </Button>
            )}
            {shelf === "currently_reading" && (
              <Button
                size="xs"
                width="full"
                variant="subtle"
                colorPalette="green"
                onClick={() => onUpdateStatus(_id, shelf, "read")}
              >
                <LuCheck /> Mark as Read
              </Button>
            )}
            {shelf === "read" && (
              <Text fontSize="2xs" color="green.600" fontWeight="bold">
                ✓ READ
              </Text>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ShelfCard;