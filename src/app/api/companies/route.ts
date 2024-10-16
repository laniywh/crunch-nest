import { fetchCompany } from "@/server/services/companies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const user = auth();
  const userId = user?.userId;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return new NextResponse("Bad Request: Missing symbol", { status: 400 });
  }

  try {
    const res = await fetchCompany(symbol);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error fetching company:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
