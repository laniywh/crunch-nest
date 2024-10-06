import YoyChart from "@/components/yoyChart";
import Link from "next/link";
import getLatestNumber from "@/components/companyCard/utils/getLatestNumber";
import numberFormat from "@/utils/numberFormat";
import type { Report } from "@/types";
import { fetchAndStoreFinancialReport } from "@/server/services/financialReports";
import { marinateChartData } from "@/utils/chart";

interface Company {
  name: string;
  symbol: string;
}

export default async function CompanyCard({
  company,
  showTable = false,
}: {
  company: Company;
  showTable?: boolean;
}) {
  // const _symbol = "TSLA";
  const _symbol = company.symbol;
  const { name, symbol } = company;
  const operatingCashReportsPromise: Promise<Report[]> =
    fetchAndStoreFinancialReport(_symbol, "CASH_FLOW");
  const incomeReportsPromise: Promise<Report[]> = fetchAndStoreFinancialReport(
    _symbol,
    "INCOME_STATEMENT",
  );
  const balanceSheetReportsPromise: Promise<Report[]> =
    fetchAndStoreFinancialReport(_symbol, "BALANCE_SHEET");

  const operatingCashReports = await operatingCashReportsPromise;
  const incomeReports = await incomeReportsPromise;
  const balanceSheetReports = await balanceSheetReportsPromise;

  const operatingCashData = marinateChartData(
    operatingCashReports,
    "operatingCashflow",
  );
  const netIncomeData = marinateChartData(incomeReports, "netIncome");
  const bookValueData = marinateChartData(
    balanceSheetReports,
    "totalShareholderEquity",
  );
  const revenueData = marinateChartData(incomeReports, "totalRevenue");

  const latestOperatingCash = numberFormat(getLatestNumber(operatingCashData));
  const latestNetIncome = numberFormat(getLatestNumber(netIncomeData));
  const latestBookValue = numberFormat(getLatestNumber(bookValueData));
  const latestRevenue = numberFormat(getLatestNumber(revenueData));

  return (
    <div className={"p-4 shadow"}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-lg font-medium">
          <Link href={`/dashboard/company/${symbol}`}>{name}</Link>
        </span>
        <span className="text-sm text-slate-400">{symbol}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">{latestOperatingCash}</span>
          <span
            className={"rounded-md bg-green-200 p-1 text-xs text-slate-700"}
          >
            Operating Cash
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">{latestNetIncome}</span>
          <span className={"rounded-md bg-pink-200 p-1 text-xs text-slate-700"}>
            Net Income
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">{latestBookValue}</span>
          <span
            className={"rounded-md bg-orange-200 p-1 text-xs text-slate-700"}
          >
            Book Value
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">{latestRevenue}</span>
          <span className={"rounded-md bg-blue-200 p-1 text-xs text-slate-700"}>
            Revenue
          </span>
        </div>
      </div>

      <div className={"w-full overflow-x-scroll"}>
        <YoyChart
          showTable={showTable}
          operatingCashData={operatingCashData}
          netIncomeData={netIncomeData}
          bookValueData={bookValueData}
          revenueData={revenueData}
        />
      </div>
    </div>
  );
}
