import Header from "@/components/page/header";
import { AddToListDropdown } from "./addToList/addToListDropdown";
import type { SelectCompany, UserList } from "@/server/db/schema";
import { useUserCompanyLists } from "@/hooks/useUserCompanyLists";

export function CompanyPageHeader({
  company,
  userLists,
}: {
  company: SelectCompany;
  userLists: UserList[];
}) {
  const { data: lists, isLoading, isError } = useUserCompanyLists(company?.id);

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <Header hasPadding={false}>{company?.name}</Header>
          {isLoading ? (
            <span className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600">
              Loading...
            </span>
          ) : isError ? (
            <span className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600">
              Error loading lists
            </span>
          ) : (
            <ul className="space-x-2">
              {lists?.map((list) => (
                <li
                  className="inline-block rounded-md bg-orange-200 p-1 text-xs text-slate-600"
                  key={list.listId}
                >
                  {list.listName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="text-sm text-slate-400">{company?.symbol}</span>
      </div>
      <AddToListDropdown userLists={userLists} company={company} />
    </header>
  );
}
