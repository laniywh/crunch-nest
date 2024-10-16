import { NextResponse } from "next/server";
import { getRecentCompanies } from "@/server/services/companies";

export async function GET() {
  try {
    const recentCompanies = await getRecentCompanies();
    return NextResponse.json(recentCompanies);
  } catch (error) {
    console.error("Error fetching recent companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent companies" },
      { status: 500 },
    );
  }
}
