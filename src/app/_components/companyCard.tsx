import YoyChart from "@/app/_components/yoyChart";
import Link from "next/link";

interface Company {
  name: string;
  symbol: string;
}

export default function CompanyCard({
  company,
  showTable = false,
}: {
  company: Company;
  showTable?: boolean;
}) {
  const { name, symbol } = company;
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
          <span className="font-medium">200</span>
          <span
            className={"rounded-md bg-green-200 p-1 text-xs text-slate-700"}
          >
            Net Income
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">200</span>
          <span className={"rounded-md bg-pink-200 p-1 text-xs text-slate-700"}>
            Net Income
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">200</span>
          <span
            className={"rounded-md bg-orange-200 p-1 text-xs text-slate-700"}
          >
            Net Income
          </span>
        </div>
        <div className={"flex flex-col items-center"}>
          <span className="font-medium">200</span>
          <span className={"rounded-md bg-blue-200 p-1 text-xs text-slate-700"}>
            Net Income
          </span>
        </div>
      </div>

      <div className={"w-full overflow-x-scroll"}>
        <YoyChart showTable={showTable} />
      </div>
    </div>
  );
}
