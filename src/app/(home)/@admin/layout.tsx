import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, ChartBarStacked, Users } from "lucide-react";
import { MdRateReview } from "react-icons/md";

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
  {
    id: 4,
    name: "Reviews",
    icon: <MdRateReview />,
    href: "/reviews",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForAdmin}>{children}</MainLayout>;
}
