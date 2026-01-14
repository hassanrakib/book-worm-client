import { fetchFromApi } from "@/lib/fetch-from-api";
import { IAdminOverview } from "@/types/overview";

export const getAdminDashboardOverview = async () => {
  return fetchFromApi<IAdminOverview>("/overview/admin", {
    cache: "no-store",
  });
};
