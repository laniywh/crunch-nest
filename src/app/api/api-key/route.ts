import { db } from "@/server/db";
import { apiKeys } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user = auth();
  if (!user?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = await req.json();
    const res = await db
      .insert(apiKeys)
      .values(body)
      .onConflictDoUpdate({ target: apiKeys.userId, set: { key: body.key } });
    return new NextResponse("OK");
  } catch (error) {
    console.error("Error saving API key to database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const res = await db
      .select({ id: apiKeys.id })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    return NextResponse.json({ hasApiKey: !!res?.[0]?.id });
  } catch (error) {
    console.error("Error fetching API key from database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
