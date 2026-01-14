import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, Home, Library } from "lucide-react";

const navItemsForUser: INavItem[] = [
  {
    id: 3,
    name: "Home",
    icon: <Home />,
    href: "/",
  },
  {
    id: 1,
    name: "Books",
    icon: <BookCopy />,
    href: "/books",
  },
  {
    id: 2,
    name: "My Library",
    icon: <Library />,
    href: "/library",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForUser}>{children}</MainLayout>;
}
