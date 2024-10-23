export const dynamic = "force-dynamic";
import DashboardContent from "@/components/dashboard/dashboardContent";
import Sidebar from "@/components/sidebar";
import { getRecentCompanies } from "@/server/services/companies";
import { getUserLists } from "@/server/services/userLists";
import { cn } from "@/utils/ui";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["userLists"],
      queryFn: getUserLists,
    }),
    queryClient.prefetchQuery({
      queryKey: ["recentCompanies"],
      queryFn: getRecentCompanies,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={`block h-screen grid-cols-[240px_1fr] animate-in md:grid`}
      >
        <Sidebar />
        <DashboardContent
          className={cn("overflow-x-hidden md:overflow-y-scroll")}
        >
          {children}
        </DashboardContent>
      </div>
    </HydrationBoundary>
  );
}
