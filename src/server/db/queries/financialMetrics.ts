import { db } from "@/server/db";
import { financialMetrics, InsertFinancialMetric } from "@/server/db/schema";
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
  console.log("getFinancialMetrics");

  try {
    const metrics = await db
      .select()
      .from(financialMetrics)
      .where(eq(financialMetrics.reportId, reportId));

    console.log(`report id ${reportId} metrics`, metrics);
    return metrics;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error getting financial metrics");
  }
}
