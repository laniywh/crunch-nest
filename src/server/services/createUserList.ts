import { createUserListInDb } from "@/server/db/queries/lists";

export async function createUserList(userId: string, listName: string) {
  try {
    const result = await createUserListInDb(userId, listName);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Error creating user list");
  }
}
