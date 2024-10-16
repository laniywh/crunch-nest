import { NextResponse } from "next/server";
import { getRecentlyViewedCompanies } from "@/server/db/queries/companies";

export async function GET() {
  try {
    const recentCompanies = await getRecentlyViewedCompanies();
    return NextResponse.json(recentCompanies);
  } catch (error) {
    console.error("Error fetching recently viewed companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch recently viewed companies" },
      { status: 500 },
    );
  }
}
