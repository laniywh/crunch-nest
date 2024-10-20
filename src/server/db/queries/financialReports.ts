import type { InsertFinancialReport } from "@/server/db/schema";
import { companies, financialReports } from "@/server/db/schema";
import { db } from "@/server/db";
import type { FunctionType } from "@/server/services/thirdParty/alphaVantage/types";
import { and, eq } from "drizzle-orm";

export async function getFinancialReportsInDb(
  symbol: string,
  functionType: FunctionType,
) {
  try {
    const res = await db
      .select({
        id: financialReports.id,
        reportType: financialReports.reportType,
        updatedAt: financialReports.updatedAt,
        createdAt: financialReports.createdAt,
        companyId: financialReports.companyId,
        fiscalDateEnding: financialReports.fiscalDateEnding,
        reportFrequency: financialReports.reportFrequency,
        reportedCurrency: financialReports.reportedCurrency,
      })
      .from(financialReports)
      .leftJoin(companies, eq(companies.id, financialReports.companyId))
      .where(
        and(
          eq(companies.symbol, symbol),
          eq(financialReports.reportType, functionType),
        ),
      );

    return res;
  } catch (error) {
    console.error("Database error - Error getting financial report:", error);
    throw new Error("Internal Server Error");
  }
}

export async function addFinancialReportToDb(
  report: InsertFinancialReport,
  companyId: number,
) {
  try {
    const newReports = await db
      .insert(financialReports)
      .values({ ...report, companyId })
      .returning({ id: financialReports.id });

    return newReports[0];
  } catch (error) {
    console.error("Database error - Error getting financial report:", error);
    throw new Error("Internal Server Error");
  }
}
