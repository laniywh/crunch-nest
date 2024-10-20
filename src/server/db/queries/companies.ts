import { db } from "@/server/db";
import {
  companies,
  type InsertCompany,
  type SelectCompany,
} from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getCompanyInDb(
  symbol: string,
): Promise<SelectCompany | undefined> {
  try {
    const res = await db
      .select()
      .from(companies)
      .where(eq(companies.symbol, symbol));

    return res[0];
  } catch (error) {
    console.error("Database error - Error getting company:", error);
    throw new Error("Internal Server Error");
  }
}

export async function addCompanyToDb(
  company: InsertCompany,
): Promise<SelectCompany> {
  try {
    const insertedCompanies = await db
      .insert(companies)
      .values(company)
      .returning();

    if (!insertedCompanies.length) {
      throw new Error("No company was inserted");
    }

    return insertedCompanies[0] as SelectCompany;
  } catch (error) {
    console.error("Database error - Error adding company:", error);
    throw new Error("Internal Server Error");
  }
}

export async function updateCompanyLastViewedInDb(
  companyId: number,
): Promise<SelectCompany> {
  try {
    const updatedCompanies = await db
      .update(companies)
      .set({ lastViewedAt: new Date() })
      .where(eq(companies.id, companyId))
      .returning();

    if (!updatedCompanies.length) {
      throw new Error("No company was updated");
    }

    return updatedCompanies[0] as SelectCompany;
  } catch (error) {
    console.error(
      "Database error - Error updating company last viewed timestamp:",
      error,
    );
    throw new Error("Internal Server Error");
  }
}

export async function getRecentlyViewedCompanies(
  limit = 5,
): Promise<SelectCompany[]> {
  try {
    const recentCompanies = await db
      .select()
      .from(companies)
      .orderBy(desc(companies.lastViewedAt))
      .limit(limit);

    return recentCompanies;
  } catch (error) {
    console.error(
      "Database error - Error fetching recently viewed companies:",
      error,
    );
    throw new Error("Internal Server Error");
  }
}
