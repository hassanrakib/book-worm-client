import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, ChartBarStacked, Users } from "lucide-react";

const navItemsForAdmin: INavItem[] = [
  {
    id: 3,
    name: "Books",
    icon: <BookCopy />,
    href: "/books",
  },
  {
    id: 1,
    name: "Categories",
    icon: <ChartBarStacked />,
    href: "/categories",
  },
  {
    id: 2,
    name: "Users",
    icon: <Users />,
    href: "/users",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForAdmin}>{children}</MainLayout>;
}
