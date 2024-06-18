"use client";
import Button from "@/app/_components/button";
import CompanyCard from "@/app/_components/companyCard";
import { IoAdd } from "react-icons/io5";
import Header from "@/app/_components/page/header";

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
        <Button
          icon={<IoAdd size={20} />}
          onClick={() => {
            console.log("added");
          }}
        >
          Add to Watchlist
        </Button>
      </header>

      <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} showTable />
    </div>
  );
}
