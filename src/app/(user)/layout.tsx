import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, Home, Library, SquarePlay } from "lucide-react";

const navItemsForUser: INavItem[] = [
  {
    id: 3,
    name: "Home",
    icon: <Home />,
    href: "/home",
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
    href: "/my-library",
  },
  {
    id: 5,
    name: "Tutorials",
    icon: <SquarePlay />,
    href: "tutorials",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForUser}>{children}</MainLayout>;
}
