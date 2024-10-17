import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserList } from "@/server/db/schema";
import { useUser } from "@clerk/nextjs";

async function fetchUserLists(): Promise<UserList[]> {
  try {
    const response = await axios.get<UserList[]>("/api/user-lists");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user lists");
  }
}

export function useUserLists() {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery<UserList[], Error>({
    queryKey: ["userLists", userId],
    queryFn: fetchUserLists,
  });
}
