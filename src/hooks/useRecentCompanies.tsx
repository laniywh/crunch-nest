import type { SelectCompany } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchRecentCompanies(): Promise<SelectCompany[]> {
  try {
    const response = await axios.get<SelectCompany[]>("/api/companies/recent");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch recent companies");
  }
}

export function useRecentCompanies() {
  return useQuery<SelectCompany[], Error>({
    queryKey: ["recentCompanies"],
    queryFn: fetchRecentCompanies,
  });
}
