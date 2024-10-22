// Combined logic for add-company, remove-company, and company-lists routes

import { type NextRequest, NextResponse } from "next/server";
import {
  addCompanyToUserList,
  removeCompanyFromUserList,
  getUserCompanyLists,
  type AddCompanyToUserListParams,
} from "src/server/services/userLists";
import { auth } from "@clerk/nextjs/server";

// add cmpany to user list
export async function POST(req: Request) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { listId, companyId } =
    (await req.json()) as AddCompanyToUserListParams;

  try {
    const result = await addCompanyToUserList({ listId, companyId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Error adding company to list", { status: 500 });
  }
}

// remove company from user list
export async function DELETE(req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const listIdStr = req.nextUrl.searchParams.get("listId");
  const companyIdStr = req.nextUrl.searchParams.get("companyId");
  const listId = listIdStr ? Number(listIdStr) : null;
  const companyId = companyIdStr ? Number(companyIdStr) : null;

  if (!listId || !companyId) {
    return new NextResponse("Bad Request: Invalid listId or companyId", {
      status: 400,
    });
  }

  try {
    await removeCompanyFromUserList(listId, companyId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

// get user company lists
export async function GET(req: NextRequest) {
  const companyIdStr = req.nextUrl.searchParams.get("companyId");
  const companyId = companyIdStr ? Number(companyIdStr) : null;

  if (!companyId) {
    return new NextResponse("Bad Request: Invalid", { status: 400 });
  }

  try {
    const lists = await getUserCompanyLists(companyId);
    return NextResponse.json(lists);
  } catch (error) {
    console.error("API route error:", error);
    return new NextResponse("Error fetching user company lists", {
      status: 500,
    });
  }
}
