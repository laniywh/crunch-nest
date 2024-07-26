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
import calculateGrowth from "@/components/companyCard/utils/calculateGrowth";

const data = [
  { date: "2011-12-31", value: -128034000 },
  { date: "2012-12-31", value: -266081000 },
  { date: "2013-12-31", value: 257994000 },
  { date: "2014-12-31", value: 156960000 },
  { date: "2015-12-31", value: -574117000 },
  { date: "2016-12-31", value: -123829000 },
  { date: "2017-12-31", value: -61000000 },
  { date: "2018-12-31", value: 2098000000 },
  { date: "2019-12-31", value: 2405000000 },
  { date: "2020-12-31", value: 5943000000 },
  { date: "2021-12-31", value: 11497000000 },
  { date: "2022-12-31", value: 14724000000 },
  { date: "2023-12-31", value: 13256000000 },
];

export default function YoyChart({
  showTable = false,
}: {
  showTable?: boolean;
}) {
  // const operatingCash = data.slice(data.length - 10, data.length);
  // const operatingCashData: { date: string; value: number; growth: number }[] =
  [];
  const operatingCashData: { date: string; value: number; growth: number }[] =
    [];
  for (let i = data.length - 1; i >= data.length - 10 && i > 0; i--) {
    const item = data[i];
    const prevItem = data[i - 1];
    if (item && prevItem) {
      const prevValue = prevItem.value;
      const currentValue = item.value;
      const growth = calculateGrowth(currentValue, prevValue);
      operatingCashData.push({ date: item.date, value: item.value, growth });
    }
  }
  operatingCashData.reverse();

  console.log("operatingCashData: ", operatingCashData);

  return (
    <div className="min-w-fit">
      <div className={"h-[300px] w-full"}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 30,
              left: 120,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            {/*<YAxis dataKey="value" />*/}
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showTable && (
        <div className="grid w-full min-w-[600px] grid-cols-11 items-center gap-2 text-right text-sm">
          <div className="col-span-1"></div>
          <div className="col-span-10 -ml-2 -mr-2 grid grid-cols-10 gap-2 rounded-md bg-slate-100 p-2">
            {operatingCashData
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
          {new Array(4).fill(0).map((_, index) => (
            <div
              className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0"
              key={index}
            >
              <span className="">Operating Cash</span>
              {operatingCashData.map((item) => (
                <span key={item.date}>{numberFormat(item.value)}</span>
              ))}
              <div className="text-xs text-slate-400">Growth Yoy</div>
              {operatingCashData.map((item, index) => (
                <span key={index} className="text-xs text-slate-400">
                  {item.growth}%
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
