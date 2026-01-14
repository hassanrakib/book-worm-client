"use client";
import { Progress, Text, HStack, Box } from "@chakra-ui/react";

export const ReadingProgress = ({
  read,
  total,
}: {
  read: number;
  total: number;
}) => {
  const percentage = Math.min(Math.round((read / total) * 100), 100);

  return (
    <Box width="full">
      <HStack justify="space-between" mb="1">
        <Text fontSize="2xs" fontWeight="bold" color="fg.muted">
          PROGRESS
        </Text>
        <Text fontSize="2xs" fontWeight="bold">
          {percentage}%
        </Text>
      </HStack>
      <Progress.Root
        value={percentage}
        colorPalette="yellow"
        size="sm"
        borderRadius="full"
      >
        <Progress.Track bg="gray.100">
          <Progress.Range borderRadius="full" />
        </Progress.Track>
      </Progress.Root>
      <Text fontSize="2xs" mt="1" textAlign="right" color="fg.muted">
        {read} / {total} pages
      </Text>
    </Box>
  );
};
