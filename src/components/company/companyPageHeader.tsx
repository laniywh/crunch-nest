import Header from "@/components/page/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { IoAdd } from "react-icons/io5";
import type { SelectCompany, UserList } from "@/server/db/schema";
import { useCreateUserListMutation } from "@/hooks/useCreateUserListMutation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export function CompanyPageHeader({
  company,
  userLists,
}: {
  company?: SelectCompany;
  userLists?: UserList[];
}) {
  const { mutateAsync: createUserList } = useCreateUserListMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const handleCreateList = async () => {
    try {
      await createUserList(newListName);
      setIsDialogOpen(false);
      setNewListName("");
      setIsInputValid(false);
    } catch (error) {
      console.error("Error creating user list:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
    const trimmedValue = e.target.value.trim();
    setIsInputValid(trimmedValue !== "");
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300">
          <IoAdd size={20} /> Add to list
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Create a list
          </DropdownMenuItem>
          {userLists?.map((list) => (
            <DropdownMenuItem key={list.id}>{list.name}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new list</DialogTitle>
            <DialogDescription>
              Enter the name for your new list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="text"
              value={newListName}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New list name"
            />
          </div>
          <DialogFooter>
            <button
              onClick={handleCreateList}
              disabled={!isInputValid}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Create
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
