import { getUserCompanyListsInDb } from "@/server/db/queries/userLists";
import { addCompanyToUserListInDb } from "@/server/db/queries/userLists";
import { auth } from "@clerk/nextjs/server";
import { getUserListsInDb } from "@/server/db/queries/userLists";
import type { SelectUserList } from "@/server/db/schema";
import { createUserListInDb } from "@/server/db/queries/userLists";

export async function createUserList(userId: string, listName: string) {
  try {
    const result = await createUserListInDb(userId, listName);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Error creating user list");
  }
}

export async function getUserLists(): Promise<SelectUserList[]> {
  const userId = auth()?.userId;
  let res: SelectUserList[] | undefined;
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

export interface AddCompanyToUserListParams {
  listId: number;
  companyId: number;
}

export async function addCompanyToUserList(params: AddCompanyToUserListParams) {
  const { listId, companyId } = params;
  try {
    return await addCompanyToUserListInDb({ listId, companyId });
  } catch (error) {
    console.error("Error adding company to user list:", error);
    throw new Error("Internal Server Error");
  }
}

export const getUserCompanyLists = async (
  userId: string,
  companyId: number,
) => {
  try {
    const lists = await getUserCompanyListsInDb(userId, companyId);
    return lists;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Error fetching user company lists");
  }
};
