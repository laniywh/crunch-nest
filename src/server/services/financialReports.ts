import {
  AV_FinancialReport,
  AV_FinancialReports,
} from "@/server/services/thirdParty/alphaVantage/types";
import {
  SelectCompany,
  SelectFinancialMetric,
  SelectFinancialReport,
} from "@/server/db/schema";
import { addCompanyToDb, getCompanyInDb } from "@/server/db/queries/companies";
import { fetchCompany } from "@/server/services/thirdParty/alphaVantage/company";
import { fetchFinancialReports } from "@/server/services/thirdParty/alphaVantage/financialReports";
import {
  addFinancialReportToDb,
  getFinancialReportsInDb,
} from "@/server/db/queries/financialReports";
import { ReportFrequency, ReportType } from "@/types";
import { convertToFinancialReport } from "@/server/services/thirdParty/alphaVantage/mappers/financialReportMapper";
import {
  addFinancialMetrics,
  getFinancialMetrics,
} from "@/server/services/financialMetrics";

export async function fetchAllFinancialReports(symbol: string) {
  try {
    // Check if company exists in db
    let company = await getCompanyInDb(symbol);

    // If not, fetch company from API
    if (!company) {
      const companyRes = await fetchCompany(symbol);

      if (!companyRes) {
        throw new Error("Company not found in API");
      }

      // Add company to db
      company = await addCompanyToDb(companyRes);
      if (!company?.id) {
        throw new Error("Error adding company to db");
      }
    }

    // Create an array of promises for fetching the reports
    const reportTypes: ReportType[] = [
      "INCOME_STATEMENT",
      "BALANCE_SHEET",
      "CASH_FLOW",
    ];
    const promises = reportTypes.map((reportType) =>
      fetchAndStoreFinancialReport(symbol, reportType, company.id),
    );

    // Wait for all promises to resolve
    const [incomeStatements, balanceSheets, cashFlows] =
      await Promise.all(promises);

    return { incomeStatements, balanceSheets, cashFlows };
  } catch (error) {
    console.error("Error fetching financial reports:", error);
    throw new Error("Failed to fetch all financial reports");
  }
}

export async function fetchAndStoreFinancialReport(
  symbol: string,
  reportType: ReportType,
  companyId: number,
) {
  if (!symbol || !reportType) throw new Error("Missing symbol or report type");

  // Check from db first
  let reports = await getFinancialReportsInDb(symbol, reportType);

  // Not in db, fetch from 3rd party API
  if (!reports?.length) {
    const apiReports = await fetchFinancialReports(symbol, reportType);

    if (!apiReports) {
      throw new Error("No reports found from API");
    }

    await saveFinancialReports(apiReports, reportType, companyId);
    reports = await getFinancialReportsInDb(symbol, reportType);
  }

  return getReportsAndMetrics(reports);
}

export async function getReportsAndMetrics(reports: SelectFinancialReport[]) {
  const promises = [];
  const reportsResult: (SelectFinancialReport & {
    metrics: SelectFinancialMetric[];
  })[] = [];
  for (const report of reports) {
    const metrics = getFinancialMetrics(report.id);
    promises.push(metrics);
  }

  const reportsMetrics = await Promise.all(promises);

  for (const report of reports) {
    reportsResult.push({ ...report, metrics: reportsMetrics.shift() || [] });
  }

  return reportsResult;
}

export async function saveFinancialReports(
  reports: AV_FinancialReports,
  reportType: ReportType,
  companyId: number,
) {
  // Save annual reports
  for (const report of reports?.annualReports || []) {
    const newReport = await addFinancialReport(
      report,
      companyId,
      reportType,
      "ANNUAL",
    );

    if (!newReport) {
      throw new Error("Error adding financial report");
    }
    // Add financial metrics
    await addFinancialMetrics(report, newReport?.id as number);
  }

  // TODO: save quarterly reports
}

async function addFinancialReport(
  report: AV_FinancialReport,
  companyId: number,
  reportType: ReportType,
  reportFrequency: ReportFrequency,
) {
  console.log("addFinancialReport", {
    reportType,
    reportFrequency,
    fiscalDateEnding: report.fiscalDateEnding,
  });
  const convertedReport = convertToFinancialReport({
    companyId,
    report,
    reportType,
    reportFrequency,
  });
  const newReport = await addFinancialReportToDb(convertedReport, companyId);
  return newReport;
}
