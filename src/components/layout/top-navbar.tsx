"use client";

import StyledButton from "@/components/shared/styled-button";
import StyledPopover from "@/components/shared/styled-popover";
import BookWormLogo from "@/components/shared/book-worm-logo";
import { Avatar } from "@/components/ui/avatar";
import { clearToken } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { deleteToken } from "@/services/auth";
import {
  defineStyle,
  Flex,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineStyle: "solid",
});

export default function TopNavbar({
  user,
}: {
  user: Omit<IUser, "password"> | undefined;
}) {
  // next.js router
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    // delete the "token" cookie
    await deleteToken();
    // clear token from redux store
    dispatch(clearToken());

    // redirect user to the signin page
    router.replace("/signin");
  };

  return (
    <GridItem
      as="header"
      display="flex"
      alignItems="center"
      // by default logo is visible in the navbar so "space-between"
      // but whenever "lg" breakpoint is hit, sidebar will be open
      // so do "flex-end" to align items to the end
      justifyContent={{ base: "space-between", lg: "flex-end" }}
    >
      {/* hide from "lg" breakpoint because sidebar with logo on it will be visible */}
      <BookWormLogo hideFrom="lg" />
      {/* Notification Icon */}
      <Flex align="center" gap={4}>
        {/* Avatar */}
        <StyledPopover
          triggerElement={
            <IconButton rounded="full" variant="plain">
              <Avatar
                css={ringCss}
                colorPalette={"yellow"}
                src={user?.profilePhoto || undefined}
                name={user?.name || "User"}
              />
            </IconButton>
          }
        >
          {/* popover content */}
          <Flex flexDir="column" alignItems="center">
            <Avatar
              size="xl"
              src={user?.profilePhoto || undefined}
              name={user?.name || "User"}
            />
            <Text mt="1" fontSize="xl">
              {user?.name || "User"}
            </Text>
            <StyledButton mt="5" alignSelf="stretch" onClick={handleSignout}>
              Sign out
            </StyledButton>
          </Flex>
        </StyledPopover>
      </Flex>
    </GridItem>
  );
}
