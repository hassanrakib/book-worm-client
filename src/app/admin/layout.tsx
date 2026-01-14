import MainLayout, { INavItem } from "@/components/layout";
import { BookCopy, ChartBarStacked, Users } from "lucide-react";
import { MdRateReview } from "react-icons/md";

const navItemsForAdmin: INavItem[] = [
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
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForAdmin}>{children}</MainLayout>;
}
