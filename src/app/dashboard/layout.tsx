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
    <div className="block h-screen grid-cols-[240px_1fr] md:grid">
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <DashboardContent
        setShowSidebar={setShowSidebar}
        className={"overflow-x-hidden md:overflow-y-scroll"}
      >
        {children}
      </DashboardContent>
    </div>
  );
}
