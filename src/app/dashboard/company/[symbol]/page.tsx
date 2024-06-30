"use client";
import Button from "@/components/ui/button";
import CompanyCard from "@/components/companyCard";
import { IoAdd } from "react-icons/io5";
import Header from "@/components/page/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";

export default function CompanyPage() {
  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <Header hasPadding={false}>Apple Inc.</Header>
            <span className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600">
              Wish List
            </span>
          </div>
          <span className="text-sm text-slate-400">APPL</span>
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

      <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} showTable />
    </div>
  );
}
