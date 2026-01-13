import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy } from "lucide-react";

const navItemsForUser: INavItem[] = [
  {
    id: 1,
    name: "Books",
    icon: <BookCopy />,
    href: "/books",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForUser}>{children}</MainLayout>;
}
