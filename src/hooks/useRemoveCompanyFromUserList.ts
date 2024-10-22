import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export async function removeCompanyFromUserList({
  listId,
  companyId,
}: {
  listId: number;
  companyId: number;
}) {
  await axios.delete("/api/user-lists/companies", {
    params: {
      listId,
      companyId,
    },
  });
}

export function useRemoveCompanyFromUserList(companyId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCompanyFromUserList,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["userCompanyLists", companyId],
      }),
  });
}
