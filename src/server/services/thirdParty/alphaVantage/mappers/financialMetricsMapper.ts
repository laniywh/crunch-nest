import type { AV_FinancialReport } from "@/server/services/thirdParty/alphaVantage/types";

const EXCLUDED_METRICS = ["fiscalDateEnding", "reportedCurrency"];

export function convertToFinancialMetrics(
  report: AV_FinancialReport,
  reportId: number,
) {
  const metrics: {
    metricName: string;
    metricValue: string;
    reportId: number;
  }[] = [];

  Object.keys(report).forEach((key) => {
    if (!EXCLUDED_METRICS.includes(key) && key in report) {
      const typedKey = key as keyof AV_FinancialReport;
      metrics.push({
        reportId,
        metricName: key,
        metricValue: report[typedKey],
      });
    }
  });

  return metrics;
}
