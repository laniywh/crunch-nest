import { db } from "@/server/db";
import { lists, companyListMappings } from "@/server/db/schema";
import type { AddCompanyToUserListParams } from "@/server/services/addCompanyToUserList";
import { eq, and } from "drizzle-orm";

export async function getUserListsInDb(userId: string) {
  try {
    return await db.select().from(lists).where(eq(lists.userId, userId));
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error getting user lists");
  }
}

export async function createUserListInDb(userId: string, listName: string) {
  try {
    const result = await db
      .insert(lists)
      .values({ userId, name: listName })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error creating user list");
  }
}

export async function addCompanyToUserListInDb(
  params: AddCompanyToUserListParams,
) {
  const { listId, companyId } = params;
  try {
    return await db.insert(companyListMappings).values({ companyId, listId });
  } catch (error) {
    console.error("Error adding company to user list:", error);
    throw new Error("Internal Server Error");
  }
}

export const getUserCompanyListsInDb = async (
  userId: string,
  companyId: number,
) => {
  try {
    return await db
      .select({
        listId: companyListMappings.listId,
        listName: lists.name,
      })
      .from(companyListMappings)
      .innerJoin(lists, eq(companyListMappings.listId, lists.id))
      .where(
        and(
          eq(companyListMappings.companyId, companyId),
          eq(lists.userId, userId),
        ),
      )
      .execute();
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error fetching user company lists");
  }
};
