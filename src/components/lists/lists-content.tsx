"use client";
import { BsThreeDots } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import Header from "@/components/page/header";
import Link from "next/link";
import { useState } from "react";
import { useUserLists } from "@/hooks/useUserLists";
import type { SelectUserList } from "@/server/db/schema";

export function ListsContentInner() {
  const [addNew, setAddNew] = useState(false);
  const { data: userLists, isLoading, error } = useUserLists();

  const handleClickAddNew = () => {
    setAddNew(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Header>Lists</Header>

      <div className="grid max-w-screen-md grid-cols-1 gap-4 sm:grid-cols-2">
        {userLists?.map((list: SelectUserList) => (
          <Link href={`/dashboard/list/${list.id}`} key={list.id}>
            <div
              className={
                "group/list flex items-center rounded border p-4 hover:bg-slate-50"
              }
            >
              <span
                className={
                  "grow overflow-hidden text-ellipsis whitespace-nowrap pr-4"
                }
              >
                {list.name}
              </span>
              <div className="invisible flex w-0 gap-1 group-hover/list:visible group-hover/list:w-fit">
                <button className="rounded border border-slate-50 p-1 hover:border-slate-200">
                  <RiPencilFill />
                </button>
                <button className="rounded border border-slate-50 p-1 hover:border-slate-200">
                  <BsThreeDots />
                </button>
              </div>
            </div>
          </Link>
        ))}
        {addNew ? (
          <form className={"col-start-1"}>
            <fieldset>
              <input
                className={"w-full rounded border p-4"}
                type="text"
                placeholder="Type a name..."
              />
            </fieldset>
          </form>
        ) : (
          <span
            className="col-start-1 mt-2 inline-block cursor-pointer pl-0 text-sm text-gray-500"
            onClick={handleClickAddNew}
          >
            + New List
          </span>
        )}
      </div>
    </div>
  );
}
