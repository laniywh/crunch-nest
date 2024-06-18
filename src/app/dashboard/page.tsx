import CompanyCard from "@/app/_components/companyCard";
import CompanyCardList from "@/app/_components/companyCardList";

export default function DashboardPage() {
  const COMPANIES = [
    {
      name: "Nvidia Corporation",
      symbol: "NVDA",
    },
    {
      name: "Tesla Inc.",
      symbol: "TSLA",
    },
    {
      name: "Apple Inc.",
      symbol: "AAPL",
    },
    {
      name: "Microsoft Corporation",
      symbol: "MSFT",
    },
  ];
  return (
    <div>
      <h1 className="py-4 text-3xl font-semibold">Dashboard</h1>
      <CompanyCardList>
        {COMPANIES.map((company) => (
          <CompanyCard key={company.symbol} company={company} />
        ))}
      </CompanyCardList>
    </div>
  );
}
