import { auth } from "@clerk/nextjs/server";
import { getApiKeyInDb } from "@/server/db/queries/apiKeys";

export async function getApiKey() {
  const userId = auth()?.userId;
  let res: string | undefined;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    res = await getApiKeyInDb(userId);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
