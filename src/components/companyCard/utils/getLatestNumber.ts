import type { ReportData } from "@/components/companyCard/types";

export default function getLatestNumber(reports: ReportData[]) {
  const sortedReportsAsc = reports.sort((a, b) => a.date.localeCompare(b.date));

  return sortedReportsAsc[sortedReportsAsc.length - 1]?.value ?? null;
}
