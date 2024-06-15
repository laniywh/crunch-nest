"use client";
import Sidebar from "@/app/_components/sidebar";
import DashboardContent from "@/app/_components/dashboardContent";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <DashboardContent setShowSidebar={setShowSidebar}>
        {children}
      </DashboardContent>
    </div>
  );
}
