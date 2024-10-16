import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchAllFinancialReports } from "@/server/services/financialReports";
import { fetchCompany } from "@/server/services/companies";

export default async function Page({
  params,
  children,
}: {
  params: { symbol: string };
  children: React.ReactNode;
}) {
  const { symbol } = params;
  const queryClient = new QueryClient();

  // fetch reports from api or db and create company if not exists
  await queryClient.prefetchQuery({
    queryKey: ["reports", symbol],
    queryFn: () => fetchAllFinancialReports(symbol),
  });
  // need to fetch company from db after reports
  await queryClient.prefetchQuery({
    queryKey: ["company", symbol],
    queryFn: () => fetchCompany(symbol),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
