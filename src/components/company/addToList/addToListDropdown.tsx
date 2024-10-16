import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { InputDialog } from "@/components/ui/inputDialog";
import { useCreateUserListMutation } from "@/hooks/useCreateUserListMutation";
import type { UserList } from "@/server/db/schema";

export function AddToListDropdown({ userLists }: { userLists?: UserList[] }) {
  const { mutateAsync: createUserList } = useCreateUserListMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300">
          <IoAdd size={20} /> Add to list
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            Create a list
          </DropdownMenuItem>
          {userLists?.map((list) => (
            <DropdownMenuItem key={list.id}>{list.name}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <InputDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={createUserList}
        title="Create a new list"
        description="Enter the name for your new list."
        placeholder="New list name"
        confirmButtonText="Create"
      />
    </>
  );
}
