"use client";

import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Badge,
  IconButton,
  Group,
} from "@chakra-ui/react";
import { LuCheck, LuTrash2, LuBook } from "react-icons/lu";
import { IReview } from "@/types/review";

interface ReviewModerationCardProps {
  review: IReview;
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ReviewModerationCard = ({
  review,
  onApprove,
  onDelete,
}: ReviewModerationCardProps) => {
  const isPending = review.status === "pending";

  return (
    <Box p="4" borderWidth="1px" borderRadius="2xl" bg="white" shadow="sm">
      <VStack align="stretch" gap="3">
        {/* User & Status Header */}
        <HStack justify="space-between">
          <HStack gap="3">
            <Avatar.Root size="sm">
              <Avatar.Image src={review.user.profilePhoto} />
              <Avatar.Fallback name={review.user.name} />
            </Avatar.Root>
            <VStack align="start" gap="0">
              <Text fontSize="sm" fontWeight="bold">
                {review.user.name}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {review.user.email}
              </Text>
            </VStack>
          </HStack>
          <Badge colorPalette={isPending ? "orange" : "green"} variant="subtle">
            {review.status}
          </Badge>
        </HStack>

        {/* Book Context */}
        <HStack
          gap="2"
          p="2"
          bg="gray.50"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="dashed"
        >
          <LuBook size="14" />
          <Text fontSize="xs" fontWeight="semibold" lineClamp={1}>
            {review.book.title}
          </Text>
        </HStack>

        {/* The Content */}
        <Box>
          <HStack gap="1" mb="1">
            <Text fontWeight="bold" fontSize="sm" color="yellow.600">
              {review.rating} ★
            </Text>
          </HStack>
          <Text fontSize="sm" color="fg.info" lineHeight="short">
            "{review.comment}"
          </Text>
        </Box>

        {/* Actions */}
        <Group attached width="full">
          {isPending && (
            <IconButton
              flex="1"
              variant="subtle"
              colorPalette="green"
              onClick={() => onApprove(review._id)}
              aria-label="Approve review"
            >
              <LuCheck />{" "}
              <Text fontSize="xs" fontWeight="bold">
                Approve
              </Text>
            </IconButton>
          )}
          <IconButton
            flex={isPending ? "0.4" : "1"}
            variant="subtle"
            colorPalette="red"
            onClick={() => onDelete(review._id)}
            aria-label="Delete review"
          >
            <LuTrash2 />{" "}
            {!isPending && (
              <Text fontSize="xs" fontWeight="bold">
                Delete
              </Text>
            )}
          </IconButton>
        </Group>
      </VStack>
    </Box>
  );
};
