import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SelectUserList } from "@/server/db/schema";

const fetchUserCompanyLists = async (companyId: number) => {
  const response = await axios.get<SelectUserList[]>(
    "/api/user-lists/companies",
    {
      params: {
        companyId,
      },
    },
  );
  return response.data;
};

export const useUserCompanyLists = (companyId: number) => {
  return useQuery({
    queryKey: ["userCompanyLists", companyId],
    queryFn: () => fetchUserCompanyLists(companyId),
    enabled: !!companyId,
  });
};
