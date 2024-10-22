import Header from "@/components/page/header";
import { AddToListDropdown } from "./addToList/addToListDropdown";
import type { SelectCompany, SelectUserList } from "@/server/db/schema";
import { useUserCompanyLists } from "@/hooks/useUserCompanyLists";
import { IoClose } from "react-icons/io5";
import { useRemoveCompanyFromUserList } from "@/hooks/useRemoveCompanyFromUserList";
import { useQueryClient } from "@tanstack/react-query";

export default function CompanyPageHeader({
  company,
  userLists,
}: {
  company: SelectCompany;
  userLists: SelectUserList[];
}) {
  const { data: lists, isLoading, isError } = useUserCompanyLists(company?.id);
  const removeCompanyFromUserList = useRemoveCompanyFromUserList(company?.id);
  const queryClient = useQueryClient();

  const handleRemoveCompany = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    listId: number,
    listName: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await removeCompanyFromUserList.mutateAsync({
        listId,
        companyId: company.id,
      });
      queryClient.invalidateQueries({
        queryKey: ["userListCompanies", listName],
      });
    } catch (error) {
      console.error("Error removing company from user list:", error);
    }
  };

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
            <ul className="flex flex-wrap gap-2">
              {lists?.map((list) => (
                <li
                  key={list.id}
                  className="group relative inline-flex cursor-pointer items-center overflow-hidden rounded-md bg-orange-200 text-xs text-slate-600"
                >
                  <div className="absolute h-full w-full">
                    <IoClose
                      className="peer absolute right-[3px] top-[6px] z-10 h-3 w-3 transition-all duration-200"
                      onClick={(e) =>
                        handleRemoveCompany(e, list.id, list.name)
                      }
                    />
                    <div className="absolute inset-0 z-0 -m-1 rounded bg-red-200 opacity-0 transition-opacity duration-200 peer-hover:opacity-100" />
                  </div>
                  <span className="relative mr-1 px-2 py-1 pr-3 ">
                    {list.name}
                  </span>
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
