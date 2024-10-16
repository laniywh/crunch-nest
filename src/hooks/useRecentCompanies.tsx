import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface RecentCompany {
  symbol: string;
  name: string;
}

const fetchRecentCompanies = async (): Promise<RecentCompany[]> => {
  const { data } = await axios.get<RecentCompany[]>(
    "/api/companies/recently-viewed",
  );
  return data;
};

export const useRecentCompanies = () => {
  return useQuery<RecentCompany[], Error>({
    queryKey: ["recentCompanies"],
    queryFn: fetchRecentCompanies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
