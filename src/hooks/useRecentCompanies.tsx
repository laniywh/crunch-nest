import type { SelectCompany } from "@/server/db/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchRecentCompanies(): Promise<SelectCompany[]> {
  const response = await axios.get<SelectCompany[]>("/api/companies/recent");
  return response.data;
}

export function useRecentCompanies() {
  return useSuspenseQuery<SelectCompany[], Error>({
    queryKey: ["recentCompanies"],
    queryFn: fetchRecentCompanies,
  });
}
