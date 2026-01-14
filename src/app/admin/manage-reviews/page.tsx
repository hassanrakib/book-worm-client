import ReviewTabs from "@/components/admin-ui/reviews/review-tabs";
import { getReviews } from "@/services/review";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const ReviewModerationPage = async () => {
  const reviewsResponse = await getReviews();

  console.log("Review data", reviewsResponse.data);

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <Box>
        <Heading size="xl" mb="1">
          Review Moderation
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Approve or remove community contributions.
        </Text>
      </Box>
      <ReviewTabs initialReviews={reviewsResponse?.data || []} />
    </VStack>
  );
};

export default ReviewModerationPage;
