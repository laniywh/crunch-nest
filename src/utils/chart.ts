import type { Report } from "@/types";
export function marinateChartData(reports: Report[]) {
  const operatingCash = reports.map((report) => ({
    date: report.fiscalDateEnding,
    value: report.metrics.find(
      (metric) => metric.metricName === "operatingCashflow",
    )?.metricValue,
  }));

  return operatingCash;
}
