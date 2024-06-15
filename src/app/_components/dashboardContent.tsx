import Search from "@/app/_components/search";
import { FiMenu } from "react-icons/fi";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

export default function DashboardContent({
  setShowSidebar,
  children,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <div className="grow overflow-y-scroll p-4">
      <div>
        <div className="flex justify-end">
          <FiMenu
            className={"sm:hidden"}
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
