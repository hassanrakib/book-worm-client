import { Flex, Text, Icon, VStack } from "@chakra-ui/react";
import { SquareLibrary } from "lucide-react";
import Link from "next/link";

// interface of nav item
export interface INavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
}

// nav items
export const navItems: INavItem[] = [
  { id: 1, name: "Manage Books", icon: <SquareLibrary />, href: "/manage-books" },
];

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

const SidebarItems = () => {
  return (
    <VStack gap={2} align="stretch">
      {navItems.map((item) => (
        <SidebarItem key={item.id} navItem={item} />
      ))}
    </VStack>
  );
};

export default SidebarItems;