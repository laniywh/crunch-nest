import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SelectUserList } from "@/server/db/schema";

export async function fetchUserLists(): Promise<SelectUserList[]> {
  try {
    const response = await axios.get<SelectUserList[]>("/api/user-lists");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user lists");
  }
}

export function useUserLists() {
  return useSuspenseQuery<SelectUserList[], Error>({
    queryKey: ["userLists"],
    queryFn: fetchUserLists,
  });
}
