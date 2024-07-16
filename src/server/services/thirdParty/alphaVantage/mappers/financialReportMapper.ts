import { AV_FinancialReport } from "@/server/services/thirdParty/alphaVantage/types";
import { InsertFinancialReport } from "@/server/db/schema";
import { ReportFrequency, ReportType } from "@/types";
interface ConvertToFinancialReport {
  companyId: number;
  report: AV_FinancialReport;
  reportType: ReportType;
  reportFrequency: ReportFrequency;
}
export function convertToFinancialReport({
  companyId,
  report,
  reportType,
  reportFrequency,
}: ConvertToFinancialReport): InsertFinancialReport {
  return {
    companyId,
    fiscalDateEnding: report.fiscalDateEnding,
    reportFrequency,
    reportType,
    reportedCurrency: report.reportedCurrency,
  };
}
