import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
    if (searchTerm) {
      void router.push(`/dashboard/company/${searchTerm}`);
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        console.log("Escape key pressed, closing dialog");
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      setSearchTerm(""); // Clear the search term when dialog opens
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center rounded-md bg-slate-50 px-3 py-1.5 text-sm text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <FiSearch className="mr-2" />
          Search...
          <span className="ml-auto block pl-4 text-xs">⌘K</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg font-semibold">
            Search
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search..."
            />
          </div>
          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
