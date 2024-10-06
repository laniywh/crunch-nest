import calculateGrowth from "@/components/companyCard/utils/calculateGrowth";
import type { ReportData } from "@/components/companyCard/types";

export default function transformToTableData(reports: ReportData[]) {
  const data: { date: string; value: number; growth: number }[] = [];
  for (let i = reports.length - 1; i >= reports.length - 10 && i > 0; i--) {
    const item = reports[i];
    const prevItem = reports[i - 1];
    if (item && prevItem) {
      const prevValue = Number(prevItem.value);
      const currentValue = Number(item.value);
      const growth = calculateGrowth(currentValue, prevValue);
      data.push({ date: item.date, value: currentValue, growth });
    }
  }
  data.reverse();
  return data;
}
