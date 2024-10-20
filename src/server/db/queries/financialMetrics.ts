import { db } from "@/server/db";
import type { InsertFinancialMetric } from "@/server/db/schema";
import { financialMetrics } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function addFinancialMetricsToDb(
  metrics: InsertFinancialMetric[],
) {
  console.log("addFinancialMetricsToDb");

  try {
    await db
      .insert(financialMetrics)
      .values(metrics)
      .returning({ id: financialMetrics.id });
  } catch (error) {
    console.error("Database error - Error adding financial metrics:", error);
    throw new Error("Internal Server Error");
  }
}

export async function getFinancialMetricsInDb(reportId: number) {
  try {
    const metrics = await db
      .select()
      .from(financialMetrics)
      .where(eq(financialMetrics.reportId, reportId));

    return metrics;
  } catch (error) {
    console.error("Database error - Error getting financial metrics:", error);
    throw new Error("Internal Server Error");
  }
}
