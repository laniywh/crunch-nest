import Search from "@/app/_components/search";
import { FiMenu } from "react-icons/fi";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { cn } from "@/utils/ui";

export default function DashboardContent({
  setShowSidebar,
  children,
  className,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grow p-4", className)}>
      <div>
        <div className="flex justify-end">
          <FiMenu
            className={"md:hidden"}
            onClick={() => setShowSidebar(true)}
          />
        </div>
        <div className="flex items-center justify-end">
          {/*<span>breadcrumb</span>*/}
          <Search />
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
