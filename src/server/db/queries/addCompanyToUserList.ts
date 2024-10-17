import { db } from "@/server/db";
import { userLists } from "@/server/db/schema";

export async function addCompanyToUserListQuery(listId: string, companyId: string) {
  await db.insert(userLists).values({ listId, companyId });
}
