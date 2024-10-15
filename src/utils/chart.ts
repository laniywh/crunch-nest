import type { Report } from "@/types";
export function marinateChartData(reports: Report[], metricName: string) {
  const chartData = reports?.map((report) => ({
    date: report.fiscalDateEnding,
    value: report.metrics.find((metric) => metric.metricName === metricName)
      ?.metricValue,
  }));

  return chartData;
}
