import { db } from "@/server/db";
import { apiKeys } from "@/server/db/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user = auth();
  if (!user?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = (await req.json()) as { key: string };
    await db
      .insert(apiKeys)
      .values({ userId: user.userId, key: body.key })
      .onConflictDoUpdate({ target: apiKeys.userId, set: { key: body.key } });
    return new NextResponse("OK");
  } catch (error) {
    console.error("Error saving API key to database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(_req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await db
      .select({ id: apiKeys.id })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    return NextResponse.json({ hasApiKey: result.length > 0 && !!result[0]?.id });
  } catch (error) {
    console.error("Error fetching API key from database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
