import type { AV_FinancialReport } from "@/server/services/thirdParty/alphaVantage/types";
import { convertToFinancialMetrics } from "@/server/services/thirdParty/alphaVantage/mappers/financialMetricsMapper";
import {
  addFinancialMetricsToDb,
  getFinancialMetricsInDb,
} from "@/server/db/queries/financialMetrics";

export async function addFinancialMetrics(
  report: AV_FinancialReport,
  reportId: number,
) {
  const metrics = convertToFinancialMetrics(report, reportId);

  try {
    await addFinancialMetricsToDb(metrics);
  } catch (error) {
    throw new Error("Error adding financial metrics");
  }
}

export async function getFinancialMetrics(reportId: number) {
  try {
    const metrics = await getFinancialMetricsInDb(reportId);
    return metrics;
  } catch (error) {
    throw new Error("Error getting financial metrics");
  }
}
