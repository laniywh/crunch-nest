export const ReportFrequencies = ["ANNUAL", "QUARTERLY"] as const;
export type ReportFrequency = (typeof ReportFrequencies)[number];

export const ReportTypes = [
  "INCOME_STATEMENT",
  "BALANCE_SHEET",
  "CASH_FLOW",
] as const;
export type ReportType = (typeof ReportTypes)[number];
