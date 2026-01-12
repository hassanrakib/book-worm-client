import MainLayout, { INavItem } from "@/components/layout";
import { SquareLibrary } from "lucide-react";

const navItemsForUser: INavItem[] = [
  {
    id: 1,
    name: "Manage Books",
    icon: <SquareLibrary />,
    href: "/manage-books",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForUser}>{children}</MainLayout>;
}
