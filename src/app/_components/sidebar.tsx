import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { useClickOutside } from "@/app/_components/hooks/useClickOutside";
import { IoClose } from "react-icons/io5";

export default function Sidebar({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const MOCK_SYMBOLS = ["NVDA", "TSLA", "AAPL", "MSFT", "AMZN"];
  const MOCK_LISTS = ["Watchlist", "Wish List"];
  const ref = useClickOutside(() => setShow(false));

  return (
    <aside
      className={`absolute ${show ? "right-0" : "-right-80"} max-w-screen overflow--y-scroll z-10 h-screen w-60 bg-slate-100 md:static lg:w-80`}
      ref={ref}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer p-2 sm:hidden"
        onClick={() => setShow(false)}
      >
        <IoClose size={24} />
      </div>
      <Link
        className="inline-block p-4 pb-10 text-lg font-medium"
        href="/public"
      >
        CrunchNest
      </Link>

      <div className="p-2">
        <span className="flex items-center gap-1 pl-2 text-sm font-semibold text-slate-400">
          <MdRemoveRedEye /> <span>Recently Viewed</span>
        </span>
        {MOCK_SYMBOLS.map((symbol) => (
          <Link
            className="block rounded p-2 py-1 hover:bg-slate-200"
            key={symbol}
            href={`/dashboard/company/${symbol}`}
          >
            {symbol}
          </Link>
        ))}
        <Link
          href="/"
          className="mb-8 block rounded p-2 text-slate-400 hover:bg-slate-200"
        >
          More
        </Link>

        <span className="flex items-center gap-1 pl-2 text-sm font-semibold text-slate-400">
          <FaListUl />
          <span>List</span>
        </span>
        {MOCK_LISTS.map((list) => (
          <Link
            className="block rounded p-2 py-1 hover:bg-slate-200"
            key={list}
            href={"/dashboard/list/watchlist"}
          >
            {list}
          </Link>
        ))}
        <Link
          href="/dashboard/lists"
          className="mb-8 block rounded p-2 text-slate-400 hover:bg-slate-200"
        >
          More
        </Link>

        <Link className={"block rounded p-2 hover:bg-slate-200"} href="/">
          Settings
        </Link>
      </div>
    </aside>
  );
}
