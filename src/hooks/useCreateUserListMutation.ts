import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecentCompanies } from "./useRecentCompanies";

type CreateUserListResponse = {
  id: string;
  userId: string;
  name: string;
};

async function createUserList(listName: string) {
  try {
    const response = await axios.post<CreateUserListResponse>(
      "/api/user-lists",
      { listName },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user list:", error);
    throw new Error("Error creating user list");
  }
}

export function useCreateUserListMutation() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const { data: recentCompanies } = useRecentCompanies();
  console.log({ recentCompanies });

  return useMutation({
    mutationFn: createUserList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLists", userId] });
    },
  });
}
