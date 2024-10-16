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
    console.error("Database error:", error);
    throw new Error("Error adding financial metrics");
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
    console.error("Database error:", error);
    throw new Error("Error getting financial metrics");
  }
}
