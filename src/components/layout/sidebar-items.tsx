import { Flex, Text, Icon, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { INavItem } from "@/components/layout";

const SidebarItem = ({ navItem }: { navItem: INavItem }) => {
  const { name, icon, href } = navItem;
  return (
    <Link href={href}>
      <Flex
        align="center"
        gap={3}
        p={1.5}
        rounded="xl"
        _hover={{ bg: "bg.muted" }}
      >
        {/* Small Icon */}
        <Icon boxSize={5}>{icon}</Icon>

        {/* Text */}
        <Text fontSize="md" color="fg.muted">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

const SidebarItems = ({ navItems }: { navItems: INavItem[] }) => {
  return (
    <VStack gap={2} align="stretch">
      {navItems.map((item) => (
        <SidebarItem key={item.id} navItem={item} />
      ))}
    </VStack>
  );
};

export default SidebarItems;
