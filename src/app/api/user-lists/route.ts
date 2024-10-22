import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createUserList, getUserLists } from "@/server/services/userLists";
import { removeUserList } from "@/server/services/userLists";

// create user list
export async function POST(req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = (await req.json()) as { listName: string };
  const { listName } = body;

  if (!listName) {
    return new NextResponse("Bad Request: Invalid listName", { status: 400 });
  }

  try {
    const result = await createUserList(userId, listName);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Error creating user list" },
      { status: 500 },
    );
  }
}

// get user lists
export async function GET() {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const result = await getUserLists();
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Error getting user lists", { status: 500 });
  }
}

// delete user list
export async function DELETE(req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const listIdStr = req.nextUrl.searchParams.get("listId");
  const listId = listIdStr ? Number(listIdStr) : null;

  if (!listId) {
    return new NextResponse("Bad Request: Invalid listId", { status: 400 });
  }

  try {
    await removeUserList(listId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
