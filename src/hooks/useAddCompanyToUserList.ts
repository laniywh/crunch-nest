import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function addCompanyToList({
  listId,
  companyId,
}: {
  listId: string;
  companyId: string;
}) {
  await axios.post("/api/user-lists/add-company", {
    listId,
    companyId,
  });
}

export function useAddCompanyToUserList() {
  return useMutation({ mutationFn: addCompanyToList });
}
