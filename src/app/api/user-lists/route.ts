import { NextResponse } from "next/server";
import { createUserList } from "@/server/services/createUserList";
import { auth } from "@clerk/nextjs/server";
import { getUserListsInDb } from "@/server/db/queries/lists";

export async function POST(req: Request) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = (await req.json()) as { listName: string };
    const result = await createUserList(userId, body.listName);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Error creating user list" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const result = await getUserListsInDb(userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Error getting user lists", { status: 500 });
  }
}
