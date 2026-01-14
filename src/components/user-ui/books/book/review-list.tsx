import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import ReviewItem from "./review-item";
import { getApprovedReviewsByBookId } from "@/services/review";

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const res = await getApprovedReviewsByBookId(bookId);

  const approvedReviews = res?.data || [];

  return (
    <VStack align="stretch" gap="6" mt="4">
      <Box>
        <Heading size="md" mb="1">
          Community Reviews
        </Heading>
        <Text fontSize="sm" color="fg.muted">
          {approvedReviews.length} people have shared their thoughts
        </Text>
      </Box>

      {approvedReviews.length > 0 ? (
        <Box px="1">
          {approvedReviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </Box>
      ) : (
        <Box
          py="12"
          textAlign="center"
          borderWidth="1px"
          borderStyle="dashed"
          borderRadius="2xl"
          bg="gray.50"
        >
          <Text color="fg.muted" fontSize="sm">
            No reviews yet. Be the first to review this book!
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default ReviewList;
