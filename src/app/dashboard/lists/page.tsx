"use client";
import { BsThreeDots } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import Header from "@/components/page/header";
import Link from "next/link";
import { useState } from "react";

export default function ListsPage() {
  const [addNew, setAddNew] = useState(false);

  const handleClickAddNew = () => {
    setAddNew(true);
  };

  return (
    <div>
      <Header>Lists</Header>

      <div className="grid max-w-screen-md grid-cols-1 gap-4 sm:grid-cols-2">
        {new Array(5).fill(0).map((_, index) => (
          <Link href={`/dashboard/list/watchlist`} key={index}>
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
                ut ipsum esse dolore labore elit
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
