import type { ReportData } from "@/components/companyCard/types";

export function transformToChartData(
  operatingCashData: ReportData[],
  netIncomeData: ReportData[],
  bookValueData: ReportData[],
  revenueData: ReportData[],
) {
  const minLength = Math.min(
    operatingCashData.length,
    netIncomeData.length,
    bookValueData.length,
    revenueData.length,
  );
  const data = [];
  for (let i = 0; i < minLength; i++) {
    if (
      operatingCashData[i] &&
      netIncomeData[i] &&
      bookValueData[i] &&
      revenueData[i]
    ) {
      data.push({
        date: operatingCashData[i]!.date,
        operatingCash: operatingCashData[i]!.value,
        netIncome: netIncomeData[i]!.value,
        bookValue: bookValueData[i]!.value,
        revenue: revenueData[i]!.value,
      });
    }
  }
  return data;
}
