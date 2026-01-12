"use client";

import StyledButton from "@/components/shared/styled-button";
import StyledPopover from "@/components/shared/styled-popover";
import BookWormLogo from "@/components/shared/book-worm-logo";
import { Avatar } from "@/components/ui/avatar";
import useToken from "@/hooks/useToken";
import { clearToken } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { deleteToken } from "@/services/auth";
import { decodeToken } from "@/utils/auth";
import { Flex, GridItem, IconButton, Text } from "@chakra-ui/react";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { IUser } from "@/types/user";

export default function TopNavbar() {
  // next.js router
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  // get the token
  const token = useToken();

  // decrypt the token
  const tokenPayload = decodeToken(token);

  let user: Omit<IUser, "password"> | undefined;

  if (tokenPayload) {
    const { data } = useGetMeQuery(undefined);

    user = data?.data;
  }

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
        <IconButton aria-label="Notifications" variant="ghost" rounded="full">
          <BellIcon />
        </IconButton>
        {/* Avatar */}
        <StyledPopover
          triggerElement={
            <IconButton rounded="full" variant="plain">
              <Avatar
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
