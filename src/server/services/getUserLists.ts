import { auth } from "@clerk/nextjs/server";
import { getUserListsInDb } from "@/server/db/queries/lists";
import type { UserList } from "@/server/db/schema";

export async function getUserLists(): Promise<UserList[]> {
  const userId = auth()?.userId;
  let res: UserList[] | undefined;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    res = await getUserListsInDb(userId);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
