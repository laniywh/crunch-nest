import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { useClickOutside } from "@/app/_components/hooks/useClickOutside";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction, useCallback } from "react";

export default function Sidebar({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useClickOutside(() => setShow(false));

  const closeSidebar = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <aside
      className={`absolute ${show ? "right-0" : "-right-[240px]"} z-10 h-screen w-full max-w-[240px] overflow-y-scroll bg-slate-100 md:static `}
      ref={ref}
      aria-label="Main navigation sidebar"
    >
      <div
        className="absolute right-2 top-2 cursor-pointer p-2 sm:hidden"
        onClick={closeSidebar}
        aria-label="Close sidebar"
      >
        <IoClose size={24} />
      </div>
      <Link
        className="inline-block p-4 pb-10 text-lg font-medium"
        href={"/dashboard"}
        onClick={closeSidebar}
      >
        CrunchNest
      </Link>

      <div className="p-2">
        <nav aria-labelledby={"recently-viewed-symbols"}>
          <span className="flex items-center gap-1 pl-2 text-sm font-semibold text-slate-400">
            <MdRemoveRedEye />{" "}
            <span id={"recently-viewed"}>Recently Viewed</span>
          </span>
          <ul>
            {MOCK_SYMBOLS.map((symbol) => (
              <li key={symbol}>
                <Link
                  className="block rounded p-2 py-1 hover:bg-slate-200"
                  href={`/dashboard/company/${symbol}`}
                  onClick={closeSidebar}
                >
                  {symbol}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={"/dashboard/companies"}
                className="mb-8 block rounded p-2 text-slate-400 hover:bg-slate-200"
                onClick={closeSidebar}
              >
                More
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby={"list"}>
          <span className="flex items-center gap-1 pl-2 text-sm font-semibold text-slate-400">
            <FaListUl />
            <span id={"list"}>List</span>
          </span>
          <ul>
            {MOCK_LISTS.map((list) => (
              <li key={list}>
                <Link
                  className="block rounded p-2 py-1 hover:bg-slate-200"
                  key={list}
                  href={"/dashboard/list/watchlist"}
                  onClick={closeSidebar}
                >
                  {list}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={"/dashboard/lists"}
                className="mb-8 block rounded p-2 text-slate-400 hover:bg-slate-200"
                onClick={closeSidebar}
              >
                More
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          className={"block rounded p-2 hover:bg-slate-200"}
          href={"/dashboard/settings"}
          onClick={closeSidebar}
        >
          Settings
        </Link>
      </div>
    </aside>
  );
}
const MOCK_SYMBOLS = ["NVDA", "TSLA", "AAPL", "MSFT", "AMZN"];
const MOCK_LISTS = ["Watchlist", "Wish List"];
