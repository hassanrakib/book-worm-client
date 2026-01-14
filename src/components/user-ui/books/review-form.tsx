"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { VStack, Heading, Box, Text } from "@chakra-ui/react";
import { reviewSchema } from "@/schemas/review"; // Adjust path accordingly
import StyledRating from "@/components/form/styled-rating";
import StyledTextArea from "@/components/form/styled-text-area";
import { IReview } from "@/types/review";
import Form from "@/components/form";
import SubmitButton from "@/components/form/submit-button";
import { UseFormReset } from "react-hook-form";
import { useAddReviewMutation } from "@/redux/features/review/review.api";
import { toaster } from "@/components/ui/toaster";
import { Alert } from "@/components/ui/alert";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";

type IFormValues = Pick<IReview, "rating" | "comment">;

interface ReviewFormProps {
  bookId: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const defaultValues: IFormValues = {
    rating: 0,
    comment: "",
  };

  const [
    addReview,
    {
      isLoading: isAddingReview,
      error: addReviewError,
      isSuccess: isAddReviewSuccess,
    },
  ] = useAddReviewMutation();

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const result = await addReview({ ...data, book: bookId });

    // after successful submission
    if (result.data?.data) {
      // reset the form
      reset(defaultValues);
    }
  };

  return (
    <Box p="6" borderWidth="1px" borderRadius="2xl" bg="bg.panel" shadow="sm">
      <VStack align="stretch" gap="5">
        <Box>
          <Heading size="md" mb="1">
            Write a Review
          </Heading>
          <Text fontSize="xs" color="fg.muted">
            Share your thoughts with the community
          </Text>
        </Box>

        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(reviewSchema),
          }}
        >
          <VStack align="stretch" gap="4">
            <StyledRating
              name="rating"
              label="Overall Rating"
              size="lg" // Larger for better touch targets on mobile
            />

            <StyledTextArea
              name="comment"
              label="Your Comment"
              placeholder="What did you think about the characters, plot, or writing style?"
              rows={4}
            />

            <SubmitButton
              isServerActionLoading={isAddingReview}
              loadingText="Adding Review..."
            >
              Post Review
            </SubmitButton>
            {!isAddingReview && addReviewError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(addReviewError)
                    ? addReviewError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            {!isAddingReview && isAddReviewSuccess ? (
              <Alert
                size="sm"
                variant="outline"
                status="success"
                title={"Review is pending to be approved."}
              />
            ) : null}
          </VStack>
        </Form>
      </VStack>
    </Box>
  );
};

export default ReviewForm;
