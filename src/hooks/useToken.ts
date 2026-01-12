import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function useToken() {
  return useAppSelector((state: RootState) => state.auth.token);
}