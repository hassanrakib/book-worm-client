import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  RatingGroup,
} from "@chakra-ui/react";
import { IReview } from "@/types/review";

interface ReviewItemProps {
  review: IReview;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Box py="5" borderBottomWidth="1px" _last={{ borderBottomWidth: 0 }}>
      <VStack align="stretch" gap="3">
        {/* User Info & Rating */}
        <HStack justify="space-between" align="flex-start">
          <HStack gap="3">
            <Avatar.Root size="sm">
              <Avatar.Image src={review.user.profilePhoto} />
              <Avatar.Fallback name={review.user.name} />
            </Avatar.Root>
            <VStack align="start" gap="0">
              <Text fontSize="sm" fontWeight="bold">
                {review.user.name}
              </Text>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={review.rating}
                size="xs"
                colorPalette="yellow"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </VStack>
          </HStack>

          {/* Optional: Relative time could be added here if your schema had createdAt */}
        </HStack>

        {/* Comment Content */}
        <Text fontSize="md" color="fg.default" lineHeight="relaxed">
          {review.comment}
        </Text>
      </VStack>
    </Box>
  );
};

export default ReviewItem;