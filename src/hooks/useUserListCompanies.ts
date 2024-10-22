import { SelectCompany } from "@/server/db/schema";
import { useQuery } from "@tanstack/react-query";

async function fetchUserListCompanies(
  listName: string,
): Promise<SelectCompany[]> {
  const response = await fetch(
    `/api/user-lists/${encodeURIComponent(listName)}`,
  );
  return response.json();
}

export function useUserListCompanies(listName: string) {
  return useQuery<SelectCompany[], Error>({
    queryKey: ["userListCompanies", listName],
    queryFn: () => fetchUserListCompanies(listName),
  });
}
