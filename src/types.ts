export const ReportFrequencies = ["ANNUAL", "QUARTERLY"] as const;
export type ReportFrequency = (typeof ReportFrequencies)[number];

export const ReportTypes = [
  "INCOME_STATEMENT",
  "BALANCE_SHEET",
  "CASH_FLOW",
] as const;
export type ReportType = (typeof ReportTypes)[number];

export type Report = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  companyId: number;
  fiscalDateEnding: string;
  reportFrequency: "ANNUAL" | "QUARTERLY";
  reportType: "INCOME_STATEMENT" | "BALANCE_SHEET" | "CASH_FLOW";
  reportedCurrency: string;
  metrics: {
    id: number;
    reportId: number;
    metricName: string;
    metricValue: string;
  }[];
};

export interface FinancialReports {
  incomeStatements: Report[];
  balanceSheets: Report[];
  cashFlows: Report[];
}
