"use client";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import numberFormat from "@/utils/numberFormat";
import type { ReportData } from "@/components/companyCard/types";
import transformToTableData from "@/components/companyCard/utils/transformToTableData";
import { transformToChartData } from "@/components/companyCard/utils/transformToChartData";

export default function YoyChart({
  operatingCashData,
  netIncomeData,
  bookValueData,
  revenueData,
  showTable = false,
}: {
  operatingCashData: ReportData[];
  netIncomeData: ReportData[];
  bookValueData: ReportData[];
  revenueData: ReportData[];
  showTable?: boolean;
}) {
  const _operatingCashData: { date: string; value: number; growth: number }[] =
    transformToTableData(operatingCashData);
  const _netIncomeData: { date: string; value: number; growth: number }[] =
    transformToTableData(netIncomeData);
  const _bookValueData: { date: string; value: number; growth: number }[] =
    transformToTableData(bookValueData);
  const _revenueData: { date: string; value: number; growth: number }[] =
    transformToTableData(revenueData);
  const chartData = transformToChartData(
    operatingCashData,
    netIncomeData,
    bookValueData,
    revenueData,
  );

  return (
    <div className="min-w-fit">
      <div className={"h-[300px] w-full"}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 30,
              right: 30,
              left: 120,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="operatingCash" stroke="#BBF7D0" />
            <Line type="monotone" dataKey="netIncome" stroke="#FBCFE8" />
            <Line type="monotone" dataKey="bookValue" stroke="#FED7AA" />
            <Line type="monotone" dataKey="revenue" stroke="#BFDBFE" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showTable && (
        <div className="grid w-full min-w-[600px] grid-cols-11 items-center gap-2 text-right text-sm">
          <div className="col-span-1"></div>
          <div className="col-span-10 -ml-2 -mr-2 grid grid-cols-10 gap-2 rounded-md bg-slate-100 p-2">
            {_operatingCashData
              .map((item) => new Date(item.date).getFullYear())
              .map((year) => (
                <div
                  key={year}
                  className="text-right text-sm font-normal text-slate-400"
                >
                  {year}
                </div>
              ))}
          </div>
          <div className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0">
            <span className="">Operating Cash</span>
            {_operatingCashData.map((item) => (
              <span key={item.date}>{numberFormat(item.value)}</span>
            ))}
            <div className="text-xs text-slate-400">Growth Yoy</div>
            {_operatingCashData.map((item, index) => (
              <span key={index} className="text-xs text-slate-400">
                {item.growth}%
              </span>
            ))}
          </div>
          <div className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0">
            <span className="">Net Income</span>
            {_netIncomeData.map((item) => (
              <span key={item.date}>{numberFormat(item.value)}</span>
            ))}
            <div className="text-xs text-slate-400">Growth Yoy</div>
            {_netIncomeData.map((item, index) => (
              <span key={index} className="text-xs text-slate-400">
                {item.growth}%
              </span>
            ))}
          </div>
          <div className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0">
            <span className="">Book Value</span>
            {_bookValueData.map((item) => (
              <span key={item.date}>{numberFormat(item.value)}</span>
            ))}
            <div className="text-xs text-slate-400">Growth Yoy</div>
            {_bookValueData.map((item, index) => (
              <span key={index} className="text-xs text-slate-400">
                {item.growth}%
              </span>
            ))}
          </div>
          <div className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0">
            <span className="">Revenue</span>
            {_revenueData.map((item) => (
              <span key={item.date}>{numberFormat(item.value)}</span>
            ))}
            <div className="text-xs text-slate-400">Growth Yoy</div>
            {_revenueData.map((item, index) => (
              <span key={index} className="text-xs text-slate-400">
                {item.growth}%
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
