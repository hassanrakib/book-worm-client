import { fetchFromApi } from "@/lib/fetch-from-api";
import { IAdminOverview, IUserOverview } from "@/types/overview";

export const getAdminDashboardOverview = async () => {
  return fetchFromApi<IAdminOverview>("/overview/admin", {
    cache: "no-store",
  });
};

export const getUserDashboardOverview = async () => {
  return fetchFromApi<IUserOverview>("/overview/user", {
    cache: "no-store",
  });
};
