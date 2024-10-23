import { type SelectCompany } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUserListCompanies(
  listName: string,
): Promise<SelectCompany[]> {
  const response = await axios.get<SelectCompany[]>(
    `/api/user-lists/${encodeURIComponent(listName)}`,
  );
  return response.data;
}

export function useUserListCompanies(listName: string) {
  return useQuery<SelectCompany[], Error>({
    queryKey: ["userListCompanies", listName],
    queryFn: () => fetchUserListCompanies(listName),
  });
}
