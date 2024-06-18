"use client";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function YoyChart({
  showTable = false,
}: {
  showTable?: boolean;
}) {
  return (
    <div className="min-w-fit">
      <div className={"h-[300px] w-full"}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Line
              type="monotone"
              dataKey="pv"
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
            {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map(
              (year) => (
                <div
                  key={year}
                  className="text-right text-sm font-normal text-slate-400"
                >
                  {year}
                </div>
              ),
            )}
          </div>
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-span-11 grid grid-cols-subgrid items-center gap-2 gap-y-0 border-b pb-2 pt-1 text-sm last:border-b-0">
              <span className="">Net Income</span>
              {new Array(10).fill(0).map((_, index) => (
                <span key={index}>123M</span>
              ))}
              <div className="text-xs text-slate-400">Growth Yoy</div>
              {new Array(10).fill(0).map((_, index) => (
                <span key={index} className="text-xs text-slate-400">
                  +23%
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
