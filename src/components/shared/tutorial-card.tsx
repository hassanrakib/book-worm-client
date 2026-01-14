"use client";

import { Box, Text, Image, VStack, Link } from "@chakra-ui/react";
import { ITutorial } from "@/types/tutorial";

const TutorialCard = ({ tutorial }: { tutorial: ITutorial }) => {
  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(tutorial.url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : "https://via.placeholder.com/400x225?text=No+Thumbnail";

  return (
    <Link
      href={tutorial.url}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      textDecoration="none" // Remove default underline
      _hover={{ textDecoration: "none" }} // Ensure no underline on hover
      width="100%"
    >
      <Box
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        bg="bg.panel"
        transition="all 0.2s ease-in-out"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "md",
          borderColor: "blue.500",
        }}
      >
        {/* ... Rest of your Box content remains exactly the same ... */}
        <Box position="relative" aspectRatio={16 / 9}>
          <Image src={thumbnailUrl} alt={tutorial.title} />
          {/* ... etc */}
        </Box>

        <VStack p="4" align="start" gap="1">
          <Text
            fontWeight="bold"
            lineClamp={2}
            fontSize="sm"
            color="fg.default"
          >
            {tutorial.title}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            Watch Tutorial →
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default TutorialCard;
