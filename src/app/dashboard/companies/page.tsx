export const dynamic = "force-dynamic";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Companies } from "./companies";
import { getRecentCompanies } from "@/server/services/companies";

export async function generateMetadata() {
  return { title: "Companies | Crunch Nest" };
}

export default async function CompaniesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["recentCompanies"],
    queryFn: getRecentCompanies,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Companies />
    </HydrationBoundary>
  );
}
