import { ReportData } from "@/components/companyCard/types";

export default function getLatestNumber(reports: ReportData[]) {
  const sortedReportsAsc = reports.sort((a, b) => a.date.localeCompare(b.date));
  console.log("sortedReports: ", sortedReportsAsc);

  return sortedReportsAsc[sortedReportsAsc.length - 1]?.value;
}
