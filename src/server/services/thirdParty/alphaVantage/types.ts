import type { ReportType } from "@/types";

export type FunctionType = ReportType;

export interface AV_Company {
  Symbol: string;
  Name: string;
  Description: string;
}
export interface AV_FinancialReports {
  symbol: string;
  annualReports?: AV_FinancialReport[] | null;
  quarterlyReports?: AV_FinancialReport[] | null;
}
export type AV_FinancialReport =
  | AV_IncomeStatement
  | AV_BalanceSheet
  | AV_CashFlow;

export interface AV_IncomeStatement {
  fiscalDateEnding: string;
  reportedCurrency: string;
  grossProfit: string; // Gross Profit, Total
  totalRevenue: string;
  costOfRevenue: string; // Cost of Revenue, Total
  costofGoodsAndServicesSold: string; // Cost of Goods and Services Sold, Total
  operatingIncome: string; // Operating Income (Loss), Total
  sellingGeneralAndAdministrative: string;
  researchAndDevelopment: string; // Research and Development Expense, Total
  operatingExpenses: string; // Operating Expenses, Total
  investmentIncomeNet?: string; // Investment Income, Net, Total
  netInterestIncome: string; // Interest Income (Expense), Net, Total
  interestIncome: string; // Interest Income, Total
  interestExpense: string; // Interest Expense, Total
  nonInterestIncome: string; // Noninterest Income, Total
  otherNonOperatingIncome: string; // Other Nonoperating Income (Expense), Total
  depreciation: string; // Depreciation, Total
  depreciationAndAmortization: string; // Depreciation, Depletion and Amortization, Nonproduction, Total
  incomeBeforeTax: string; // Income (Loss) Attributable to Parent before tax, Total
  incomeTaxExpense: string; // Income Tax Expense (Benefit), Total
  interestAndDebtExpense: string; // Interest and Debt Expense, Total
  netIncomeFromContinuingOperations: string; // Income (Loss) from Continuing Operations, Net of Tax, Attributable to Parent, Total
  comprehensiveIncomeNetOfTax: string; // Comprehensive Income (Loss), Net of Tax, Attributable to Parent, Total
  ebit: string; // Earnings Before Interest and Taxes
  ebitda: string; // Earnings Before Interest, Taxes, Depreciation, and Amortization
  netIncome: string; // Net Income (Loss) Attributable to Parent, Total
}

export interface AV_BalanceSheet {
  fiscalDateEnding: string; // Fiscal Date Ending
  reportedCurrency: string; // Reported Currency
  totalAssets: string; // Assets, Total
  totalCurrentAssets: string; // Assets, Current, Total
  cashAndCashEquivalentsAtCarryingValue: string; // Cash and Cash Equivalents, at Carrying Value, Ending Balance
  cashAndShortTermInvestments: string; // Cash, Cash Equivalents, and Short-term Investments, Total
  inventory: string; // Inventory, Net, Total
  currentNetReceivables: string; // Receivables, Net, Current, Total
  totalNonCurrentAssets: string; // Assets, Noncurrent, Total
  propertyPlantEquipment: string; // Property, Plant and Equipment, Net, Ending Balance
  accumulatedDepreciationAmortizationPPE?: string; // Accumulated Depreciation, Depletion and Amortization, Property, Plant, and Equipment, Ending Balance
  intangibleAssets: string; // Intangible Assets, Net (Including Goodwill), Total
  intangibleAssetsExcludingGoodwill: string; // Intangible Assets, Net (Excluding Goodwill), Total
  goodwill: string; // Goodwill, Ending Balance
  investments: string; // Investments, Total
  longTermInvestments: string; // Long-term Investments, Total
  shortTermInvestments: string; // Short-term Investments, Total
  otherCurrentAssets: string; // Other Assets, Current
  otherNonCurrentAssets?: string; // Other Assets, Noncurrent, Total
  totalLiabilities: string; // Liabilities, Total
  totalCurrentLiabilities: string; // Liabilities, Current, Total
  currentAccountsPayable: string; // Accounts Payable, Current, Total
  deferredRevenue: string; // Deferred Revenue, Total
  currentDebt: string; // Debt, Current, Total
  shortTermDebt: string; // Short-term Debt, Total
  totalNonCurrentLiabilities: string; // Liabilities, Noncurrent, Total
  capitalLeaseObligations: string; // Finance Lease, Liability, Noncurrent
  longTermDebt: string; // Long-term Debt, Total
  currentLongTermDebt: string; // Long-term Debt, Current Maturities, Total
  longTermDebtNoncurrent: string; // Long-term Debt, Excluding Current Maturities, Total
  shortLongTermDebtTotal: string; // Debt, Long-term and Short-term, Combined Amount, Total
  otherCurrentLiabilities: string; // Other Liabilities, Current, Total
  otherNonCurrentLiabilities: string; // Other Liabilities, Noncurrent, Total
  totalShareholderEquity: string; // Stockholders' Equity Attributable to Parent, Ending Balance
  treasuryStock: string; // Treasury Stock, Value, Ending Balance
  retainedEarnings: string; // Retained Earnings (Accumulated Deficit), Ending Balance
  commonStock: string; // Common Stock, Value, Issued, Ending Balance
  commonStockSharesOutstanding: string; // Common Stock, Shares, Outstanding
}

export interface AV_CashFlow {
  fiscalDateEnding: string; // Fiscal Year End Date
  reportedCurrency: string; // Currency Reported
  operatingCashflow: string; // Net Cash Provided by (Used in) Operating Activities, Total
  paymentsForOperatingActivities: string; // Payments for Operating Activities, Total
  proceedsFromOperatingActivities?: string; // Proceeds from Operating Activities, Total
  changeInOperatingLiabilities: string; // Increase (Decrease) in Operating Liabilities, Total
  changeInOperatingAssets: string; // Increase (Decrease) in Operating Assets, Total
  depreciationDepletionAndAmortization: string; // Depreciation, Depletion and Amortization, Total
  capitalExpenditures: string; // Payments to Acquire Productive Assets, Total
  changeInReceivables: string; // Increase (Decrease) in Receivables, Total
  changeInInventory: string; // Increase (Decrease) in Inventories, Total
  profitLoss: string; // Net Income (Loss), Including Portion Attributable to Noncontrolling Interest, Total
  cashflowFromInvestment: string; // Net Cash Provided by (Used in) Investing Activities, Total
  cashflowFromFinancing: string; // Net Cash Provided by (Used in) Financing Activities, Total
  proceedsFromRepaymentsOfShortTermDebt: string; // Proceeds from (Repayments of) Short-term Debt, Total
  paymentsForRepurchaseOfCommonStock?: string; // Payments for Repurchase of Common Stock
  paymentsForRepurchaseOfEquity?: string; // Payments for Repurchase of Equity, Total
  paymentsForRepurchaseOfPreferredStock?: string; // Payments for Repurchase of Preferred Stock and Preference Stock
  dividendPayout: string; // Payments of Dividends, Total
  dividendPayoutCommonStock: string; // Payments of Ordinary Dividends, Common Stock
  dividendPayoutPreferredStock?: string; // Payments of Ordinary Dividends, Preferred Stock and Preference Stock
  proceedsFromIssuanceOfCommonStock?: string; // Proceeds from Issuance of Common Stock
  proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string; // Proceeds from Issuance of Long-term Debt and Capital Securities, Net, Total
  proceedsFromIssuanceOfPreferredStock?: string; // Proceeds from Issuance of Preferred Stock, Preference Stock, and Warrants, Total
  proceedsFromRepurchaseOfEquity: string; // Proceeds from (Repurchase of) Equity, Total
  proceedsFromSaleOfTreasuryStock?: string; // Proceeds from Sale of Treasury Stock
  changeInCashAndCashEquivalents?: string; // Cash and Cash Equivalents, Period Increase (Decrease), Total
  changeInExchangeRate?: string; // Effect of Exchange Rate on Cash and Cash Equivalents, Total
  netIncome: string; // Net Income (Loss) Attributable to Parent, Total
}
