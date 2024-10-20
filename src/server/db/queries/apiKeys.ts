import { db } from "@/server/db";
import { apiKeys } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getApiKeyInDb(userId: string) {
  try {
    const res = await db
      .select({ key: apiKeys.key })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    return res?.[0]?.key;
  } catch (error) {
    console.error("Database error - Error getting api key", error);
    throw new Error("Internal Server Error");
  }
}
