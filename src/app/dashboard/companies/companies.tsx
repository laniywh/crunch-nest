"use client";
import Header from "@/components/page/header";
import CompanyCard from "@/components/companyCard/companyCard";
import CompanyCardList from "@/components/companyCardList";
import { useRecentCompanies } from "@/hooks/useRecentCompanies";

export function Companies() {
  const { data: companies, isLoading, isError, error } = useRecentCompanies();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching companies</div>;

  return (
    <div>
      <Header>Companies</Header>
      <CompanyCardList>
        {companies?.map((company) => (
          <CompanyCard key={company.id} symbol={company.symbol} />
        ))}
      </CompanyCardList>
    </div>
  );
}
