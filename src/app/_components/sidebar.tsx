import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { useClickOutside } from "@/app/_components/hooks/useClickOutside";
import { IoClose } from "react-icons/io5";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

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
  }, [setShow]);

  return (
    <aside
      className={`absolute ${show ? "right-0" : "-right-[240px]"} z-10 grid h-screen w-full max-w-[240px] grid-rows-[1fr_auto] bg-slate-100 md:static`}
      ref={ref}
      aria-label="Main navigation sidebar"
      id="sidebar"
    >
      <div className={"overflow-y-scroll pb-10"}>
        <div
          className="absolute right-2 top-2 cursor-pointer p-2 sm:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar"
          aria-controls="sidebar"
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
      </div>
      <UserSection />
    </aside>
  );
}

const UserSection = () => {
  const { user } = useUser();

  return (
    <SignedIn>
      <div className="block w-[240px] border-t-[1px] border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <UserButton />
          <span
            className={
              "overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-700"
            }
          >
            {user?.fullName}
          </span>
        </div>
      </div>
    </SignedIn>
  );
};

const MOCK_SYMBOLS = ["NVDA", "TSLA", "AAPL", "MSFT", "AMZN"];
const MOCK_LISTS = ["Watchlist", "Wish List"];
