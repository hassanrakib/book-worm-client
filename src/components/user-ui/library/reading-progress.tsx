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
        <Text
          fontSize="10px"
          fontWeight="bold"
          color="gray.400"
          letterSpacing="widest"
        >
          PROGRESS
        </Text>
        <Box bg="yellow.300" px="2" borderRadius="full">
          <Text fontSize="10px" fontWeight="black" color="gray.900">
            {percentage}%
          </Text>
        </Box>
      </HStack>

      <Progress.Root
        value={percentage}
        size="xs" // Thinner for a more modern feel
        borderRadius="full"
      >
        <Progress.Track bg="gray.100" height="4px">
          <Progress.Range bg="yellow.400" borderRadius="full" />
        </Progress.Track>
      </Progress.Root>

      <Text
        fontSize="10px"
        mt="1.5"
        textAlign="right"
        color="gray.500"
        fontWeight="medium"
      >
        {read.toLocaleString()} / {total.toLocaleString()} pages
      </Text>
    </Box>
  );
};
