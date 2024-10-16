import Header from "@/components/page/header";
import { AddToListDropdown } from "./AddToListDropdown";
import type { SelectCompany, UserList } from "@/server/db/schema";

export function CompanyPageHeader({
  company,
  userLists,
}: {
  company?: SelectCompany;
  userLists?: UserList[];
}) {

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <Header hasPadding={false}>{company?.name}</Header>
          <span className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600">
            Wish List
          </span>
        </div>
        <span className="text-sm text-slate-400">{company?.symbol}</span>
      </div>
      <AddToListDropdown userLists={userLists} />
    </header>
  );
}
