import CompanyCard from "@/components/companyCard/companyCard";
import CompanyCardList from "@/components/companyCardList";
import { QueryClient } from "@tanstack/react-query";
import { fetchAllFinancialReports } from "@/server/services/financialReports";
import { fetchCompany } from "@/server/services/companies";

export default async function DashboardPage() {
  const COMPANIES = [
    {
      name: "IBM",
      symbol: "IBM",
    },
    // {
    //   name: "Nvidia Corporation",
    //   symbol: "NVDA",
    // },
    {
      name: "Tesla Inc.",
      symbol: "TSLA",
    },
    // {
    //   name: "Apple Inc.",
    //   symbol: "AAPL",
    // },
    // {
    //   name: "Microsoft Corporation",
    //   symbol: "MSFT",
    // },
  ];

  const queryClient = new QueryClient();
  await Promise.all(
    COMPANIES.map((company) =>
      queryClient.prefetchQuery({
        queryKey: ["reports", company.symbol],
        queryFn: () => fetchAllFinancialReports(company.symbol),
      }),
    ),
  );
  await Promise.all(
    COMPANIES.map((company) =>
      queryClient.prefetchQuery({
        queryKey: ["company", company.symbol],
        queryFn: () => fetchCompany(company.symbol),
      }),
    ),
  );

  return (
    <div>
      <h1 className="py-4 text-3xl font-semibold">Dashboard</h1>
      <CompanyCardList>
        {COMPANIES.map((company) => (
          <CompanyCard key={company.symbol} symbol={company.symbol} />
        ))}
      </CompanyCardList>
    </div>
  );
}
