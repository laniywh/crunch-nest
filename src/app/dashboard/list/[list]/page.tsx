"use client";

import Header from "@/components/page/header";
import CompanyCard from "@/components/companyCard/companyCard";
import CompanyCardList from "@/components/companyCardList";
import { useUserListCompanies } from "@/hooks/useUserListCompanies";
import { useParams } from "next/navigation";

export default function ListPage() {
  const params = useParams();
  const listName = params.list as string;
  const { data: companies, isLoading, error } = useUserListCompanies(listName);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <Header>{listName}</Header>
      <CompanyCardList>
        {companies?.map((company) => (
          <CompanyCard key={company.symbol} symbol={company.symbol} />
        ))}
      </CompanyCardList>
    </div>
  );
}
