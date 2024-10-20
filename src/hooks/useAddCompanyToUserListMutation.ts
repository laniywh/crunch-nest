import type { SelectUserList } from "@/server/db/schema";
import type { AddCompanyToUserListParams } from "@/server/services/userLists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecentCompanies } from "@/hooks/useRecentCompanies";
import { useUser } from "@clerk/nextjs";

async function addCompanyToUserList({
  listId,
  companyId,
}: AddCompanyToUserListParams) {
  const response = await axios.post<SelectUserList>(
    "/api/user-lists/add-company",
    {
      listId,
      companyId,
    },
  );
  return response.data;
}

export function useAddCompanyToUserListMutation() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const { data: recentCompanies } = useRecentCompanies();

  return useMutation({
    mutationFn: addCompanyToUserList,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["userCompanyLists", userId, recentCompanies?.[0]?.id],
      }),
  });
}
