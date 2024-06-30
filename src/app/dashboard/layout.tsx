"use client";
import Sidebar from "@/components/sidebar";
import DashboardContent from "@/components/dashboard/dashboardContent";
import { useState } from "react";
import { cn } from "@/utils/ui";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={`animate-in block h-screen grid-cols-[240px_1fr] md:grid`}>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <DashboardContent
        setShowSidebar={setShowSidebar}
        className={cn(
          "overflow-x-hidden md:overflow-y-scroll",
          showSidebar ? "h-screen overflow-hidden" : "",
        )}
      >
        {children}
      </DashboardContent>
    </div>
  );
}
