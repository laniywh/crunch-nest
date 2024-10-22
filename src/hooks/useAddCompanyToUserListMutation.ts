import type { SelectUserList } from "@/server/db/schema";
import type { AddCompanyToUserListParams } from "@/server/services/userLists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function addCompanyToUserList({
  listId,
  companyId,
}: AddCompanyToUserListParams) {
  const response = await axios.post<SelectUserList>(
    "/api/user-lists/companies",
    {
      listId,
      companyId,
    },
  );
  return response.data;
}

export function useAddCompanyToUserListMutation(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCompanyToUserList,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["userCompanyLists", companyId],
      }),
  });
}
