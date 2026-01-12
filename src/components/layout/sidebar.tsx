import BookWormLogo from "@/components/shared/book-worm-logo";
import { Box, VStack } from "@chakra-ui/react";
import SidebarItems from "./sidebar-items";
import { INavItem } from "@/components/layout";

export default function Sidebar({ navItems }: {navItems: INavItem[]}) {
  return (
    <Box
      as="aside"
      p={3}
      mb={4}
      ml={4}
      bgColor="bg"
      boxShadow="xs"
      borderRadius="3xl"
      // min height of this box is 100dvh because other grid item in the same row
      // is assigned min height of 100dvh
      // and height will increase as height of other grid item increases
      // also height will increase when margin given to the bottom
      // subtract mb={4} & top={4}
      maxHeight="calc(100dvh - 32px)"
      position="sticky"
      top={4}
      // hidden below lg breakpoint
      // as grid container template columns set to '1fr only' before lg breakpoint
      hideBelow="lg"
    >
      <VStack gap={8} align="stretch">
        {/* Book Worm Logo */}
        <BookWormLogo />
        {/* Sidebar Items */}
        <SidebarItems navItems={navItems}/>
      </VStack>
    </Box>
  );
}
