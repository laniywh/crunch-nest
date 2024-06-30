import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { apiKeys } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getHasApiKey() {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await db
      .select({ id: apiKeys.id })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    const hasApiKey = !!res?.[0]?.id;
    return hasApiKey;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
