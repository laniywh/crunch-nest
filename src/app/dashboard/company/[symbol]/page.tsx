"use client";
import { useEffect } from "react";
import CompanyCard from "@/components/companyCard/companyCard";
import useCompany from "@/hooks/useCompany";
import type { SelectCompany } from "@/server/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { useUserLists } from "@/hooks/useUserLists";
import CompanyPageHeader from "@/components/company/companyPageHeader";

export default function CompanyPage({
  params: { symbol },
}: {
  params: { symbol: string };
}) {
  const { data: company } = useCompany(symbol);
  const queryClient = useQueryClient();
  const { data: userLists } = useUserLists();

  useEffect(() => {
    if (company) {
      // Update the React Query cache
      queryClient.setQueryData<SelectCompany[]>(
        ["recentCompanies"],
        (oldData) => {
          const newCompany: SelectCompany = {
            ...company,
            lastViewedAt: new Date(),
          };
          if (!oldData) return [newCompany];
          const filteredData = oldData.filter(
            (c) => c.symbol !== company.symbol,
          );
          return [newCompany, ...filteredData].slice(0, 5); // Keep only the 5 most recent
        },
      );
    }
  }, [company, queryClient]);

  return (
    <div>
      {company && userLists && (
        <CompanyPageHeader company={company} userLists={userLists} />
      )}
      <CompanyCard symbol={symbol} showTable />
    </div>
  );
}
