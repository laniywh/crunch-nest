"use client";
import { cn } from "@/utils/ui";
import { useSidebarStore } from "@/stores/sidebarStore";

export default function DashboardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { showSidebar, setShowSidebar } = useSidebarStore();

  return (
    <main
      className={cn(
        "flex h-screen flex-col overflow-x-hidden md:overflow-y-scroll",
        showSidebar ? "h-screen overflow-hidden" : "",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-gray-200 bg-white px-4 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setShowSidebar(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 px-4 py-8 md:px-8">{children}</div>
    </main>
  );
}
