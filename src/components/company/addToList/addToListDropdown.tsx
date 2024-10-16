import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { CreateListDialog } from "./createListDialog";
import { useCreateUserListMutation } from "@/hooks/useCreateUserListMutation";
import type { UserList } from "@/server/db/schema";

export function AddToListDropdown({ userLists }: { userLists?: UserList[] }) {
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
    <>
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
      <CreateListDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateList={createUserList}
      />
    </>
  );
}
