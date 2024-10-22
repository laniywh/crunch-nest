import { NextResponse } from "next/server";
import { getUserListCompanies } from "@/server/services/userLists";

export async function GET(
  request: Request,
  { params }: { params: { listName: string } },
) {
  const listName = params.listName;

  if (!listName) {
    return new NextResponse("Invalid list name", { status: 400 });
  }

  try {
    const companies = await getUserListCompanies(listName);
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching user list companies:", error);
    return new NextResponse("Failed to fetch user list companies", {
      status: 500,
    });
  }
}
