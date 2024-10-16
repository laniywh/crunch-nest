"use client";
import Header from "@/components/page/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { IoAdd } from "react-icons/io5";
import CompanyCard from "@/components/companyCard/companyCard";
import useCompany from "@/hooks/useCompany";
import type { SelectCompany } from "@/server/db/schema";

export default function CompanyPage({ symbol }: { symbol: string }) {
  const { data: company } = useCompany(symbol);
  return (
    <div>
      <PageHeader company={company} />
      <CompanyCard symbol={symbol} showTable />
    </div>
  );
}

function PageHeader({ company }: { company?: SelectCompany }) {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <Header hasPadding={false}>{company?.name}</Header>
          <span className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600">
            Wish List
          </span>
        </div>
        <span className="text-sm text-slate-400">{company?.symbol}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300">
          <IoAdd size={20} /> Add to Watchlist
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Watchlist</DropdownMenuItem>
          <DropdownMenuItem>Wish List</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
