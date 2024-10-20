import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import type { SelectUserList } from "@/server/db/schema";

const fetchUserCompanyLists = async (userId: string, companyId: number) => {
  const response = await axios.get<SelectUserList[]>(
    `/api/user-lists/company-lists?userId=${userId}&companyId=${companyId}`,
  );
  return response.data;
};

export const useUserCompanyLists = (companyId: number) => {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery({
    queryKey: ["userCompanyLists", userId, companyId],
    queryFn: () => fetchUserCompanyLists(userId!, companyId),
    enabled: !!userId && !!companyId,
  });
};
