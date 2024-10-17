import { NextResponse } from "next/server";
import { getUserCompanyLists } from "@/server/services/lists";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const companyId = searchParams.get("companyId");

    if (!userId || !companyId) {
      return new NextResponse("Missing required parameters", { status: 400 });
    }

    const lists = await getUserCompanyLists(userId, Number(companyId));
    return NextResponse.json(lists);
  } catch (error) {
    console.error("API route error:", error);
    return new NextResponse("Error fetching user company lists", {
      status: 500,
    });
  }
}
