import MainLayout, { INavItem } from "@/components/layout";
import { ChartBarStacked } from "lucide-react";

const navItemsForAdmin: INavItem[] = [
  {
    id: 1,
    name: "Categories",
    icon: <ChartBarStacked />,
    href: "/categories",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout navItems={navItemsForAdmin}>{children}</MainLayout>;
}
