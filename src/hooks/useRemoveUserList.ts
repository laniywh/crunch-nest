import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function removeUserList(listId: number) {
  await axios.delete(`/api/user-lists/${listId}`);
}

export function useRemoveUserList() {
  return useMutation({ mutationFn: removeUserList });
}
