import type { SelectCompany } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchRecentCompanies(): Promise<SelectCompany[]> {
  const response = await axios.get<SelectCompany[]>("/api/companies/recent");
  return response.data;
}

export function useRecentCompanies() {
  return useQuery<SelectCompany[], Error>({
    queryKey: ["recentCompanies"],
    queryFn: fetchRecentCompanies,
  });
}
