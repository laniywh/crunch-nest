// import { Company } from "@/lib/api/types";
import { db } from "@/server/db";
import { companies, InsertCompany, SelectCompany } from "@/server/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

// type Company = InferSelectModel<typeof companies>;

export async function getCompanyInDb(
  symbol: string,
): Promise<SelectCompany | undefined> {
  try {
    const res = await db
      .select()
      .from(companies)
      .where(eq(companies.symbol, symbol));

    return res?.[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error getting company");
  }
}

export async function addCompanyToDb(company: InsertCompany) {
  try {
    const res = await db
      .insert(companies)
      .values(company)
      .returning({ id: companies.id });
    return res[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error adding company");
  }
}
