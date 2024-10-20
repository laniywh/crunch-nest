import {
  addCompanyToUserList,
  type AddCompanyToUserListParams,
} from "@/server/services/userLists";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
