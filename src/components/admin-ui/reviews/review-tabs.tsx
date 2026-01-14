"use client";

import { useState } from "react";
import { VStack, Text, Box, Tabs } from "@chakra-ui/react";
import { ReviewModerationCard } from "./review-moderation-card";
import { IReview } from "@/types/review";
import {
  useDeleteReviewByIdMutation,
  useUpdateReviewStatusByIdMutation,
} from "@/redux/features/review/review.api";
import { toaster } from "@/components/ui/toaster";

const ReviewTabs = ({ initialReviews }: { initialReviews: IReview[] }) => {
  const [reviews, setReviews] = useState<IReview[]>(initialReviews);

  const [approve] = useUpdateReviewStatusByIdMutation();

  const [deleteReview] = useDeleteReviewByIdMutation();

  const handleApprove = async (id: string) => {
    const result = await approve({ reviewId: id, status: "approved" });

    console.log("Error of approve =>", result.data);

    if (result.data?.data) {
      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "approved" as const } : r
        )
      );
    } else {
      toaster.create({
        type: "error",
        description: "Failed to update status to approve",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteReview({ reviewId: id });

    if (result.data?.data) {
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } else {
      toaster.create({
        type: "error",
        description: "Failed to update status to approve",
      });
    }
  };

  return (
    <Tabs.Root defaultValue="pending" variant="enclosed" colorPalette="yellow">
      <Tabs.List bg="gray.50" p="1" borderRadius="xl">
        <Tabs.Trigger value="pending" flex="1" borderRadius="lg">
          Pending ({reviews.filter((r) => r.status === "pending").length})
        </Tabs.Trigger>
        <Tabs.Trigger value="approved" flex="1" borderRadius="lg">
          Approved ({reviews.filter((r) => r.status === "approved").length})
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="pending" mt="4">
        <VStack gap="4" align="stretch">
          {reviews
            .filter((r) => r.status === "pending")
            .map((review) => (
              <ReviewModerationCard
                key={review._id}
                review={review}
                onApprove={handleApprove}
                onDelete={handleDelete}
              />
            ))}
          {reviews.filter((r) => r.status === "pending").length === 0 && (
            <EmptyState message="No pending reviews to moderate." />
          )}
        </VStack>
      </Tabs.Content>

      <Tabs.Content value="approved" mt="4">
        <VStack gap="4" align="stretch">
          {reviews
            .filter((r) => r.status === "approved")
            .map((review) => (
              <ReviewModerationCard
                key={review._id}
                review={review}
                onApprove={handleApprove}
                onDelete={handleDelete}
              />
            ))}
        </VStack>
      </Tabs.Content>
    </Tabs.Root>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <Box
    textAlign="center"
    py="10"
    borderWidth="1px"
    borderStyle="dashed"
    rounded="2xl"
  >
    <Text color="fg.muted" fontSize="sm">
      {message}
    </Text>
  </Box>
);

export default ReviewTabs;
