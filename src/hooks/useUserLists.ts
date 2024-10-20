import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SelectUserList } from "@/server/db/schema";
import { useUser } from "@clerk/nextjs";

async function fetchUserLists(): Promise<SelectUserList[]> {
  try {
    const response = await axios.get<SelectUserList[]>("/api/user-lists");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user lists");
  }
}

export function useUserLists() {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery<SelectUserList[], Error>({
    queryKey: ["userLists", userId],
    queryFn: fetchUserLists,
  });
}
