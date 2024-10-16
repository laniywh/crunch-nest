import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Companies } from "./companies";

async function getRecentCompanies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/recent`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to fetch recent companies");
  return res.json();
}

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
