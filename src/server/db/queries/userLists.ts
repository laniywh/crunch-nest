import { db } from "@/server/db";
import { userLists, companyListMappings } from "@/server/db/schema";
import type { AddCompanyToUserListParams } from "@/server/services/userLists";
import type { UserCompanyList } from "@/types/lists";
import { eq, and } from "drizzle-orm";

export async function getUserListsInDb(userId: string) {
  try {
    return await db
      .select()
      .from(userLists)
      .where(eq(userLists.userId, userId));
  } catch (error) {
    console.error("Database error - Error getting user lists:", error);
    throw new Error("Internal Server Error");
  }
}

export async function createUserListInDb(userId: string, listName: string) {
  try {
    const result = await db
      .insert(userLists)
      .values({ userId, name: listName })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database error - Error creating user list:", error);
    throw new Error("Internal Server Error");
  }
}

export async function addCompanyToUserListInDb(
  params: AddCompanyToUserListParams,
) {
  const { listId, companyId } = params;
  try {
    return await db.insert(companyListMappings).values({ companyId, listId });
  } catch (error) {
    console.error("Database Error - Error adding company to user list:", error);
    throw new Error("Internal Server Error");
  }
}

export const getUserCompanyListsInDb = async (
  userId: string,
  companyId: number,
): Promise<UserCompanyList[]> => {
  try {
    return await db
      .select({
        id: companyListMappings.listId,
        name: userLists.name,
      })
      .from(companyListMappings)
      .innerJoin(userLists, eq(companyListMappings.listId, userLists.id))
      .where(
        and(
          eq(companyListMappings.companyId, companyId),
          eq(userLists.userId, userId),
        ),
      )
      .execute();
  } catch (error) {
    console.error("Database error - Error fetching user company lists:", error);
    throw new Error("Internal Server Error");
  }
};

export async function removeUserListInDb(userId: string, listId: number) {
  try {
    return await db
      .delete(userLists)
      .where(and(eq(userLists.userId, userId), eq(userLists.id, listId)));
  } catch (error) {
    console.error("Database error - Error removing user company list:", error);
    throw new Error("Internal Server Error");
  }
}

export async function removeCompanyFromUserListInDb(
  listId: number,
  companyId: number,
) {
  try {
    return await db
      .delete(companyListMappings)
      .where(
        and(
          eq(companyListMappings.listId, listId),
          eq(companyListMappings.companyId, companyId),
        ),
      );
  } catch (error) {
    console.error(
      "Database error - Error removing company from user list:",
      error,
    );
    throw new Error("Internal Server Error");
  }
}
