import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, ChartBarStacked, SquarePlay, Users } from "lucide-react";
import { MdDashboard, MdRateReview } from "react-icons/md";

const navItemsForAdmin: INavItem[] = [
  {
    id: 6,
    name: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    id: 3,
    name: "Books",
    icon: <BookCopy />,
    href: "/admin/manage-books",
  },
  {
    id: 1,
    name: "Categories",
    icon: <ChartBarStacked />,
    href: "/admin/manage-categories",
  },
  {
    id: 2,
    name: "Users",
    icon: <Users />,
    href: "/admin/manage-users",
  },
  {
    id: 4,
    name: "Reviews",
    icon: <MdRateReview />,
    href: "/admin/manage-reviews",
  },
  {
    id: 5,
    name: "Tutorials",
    icon: <SquarePlay />,
    href: "/admin/manage-tutorials",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForAdmin}>{children}</MainLayout>;
}
