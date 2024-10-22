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
import type { SelectCompany, SelectUserList } from "@/server/db/schema";
import { useAddCompanyToUserListMutation } from "@/hooks/useAddCompanyToUserListMutation";

export function AddToListDropdown({
  userLists,
  company,
}: {
  userLists: SelectUserList[];
  company: SelectCompany;
}) {
  const { mutateAsync: createUserList } = useCreateUserListMutation();
  const { mutateAsync: addCompanyToUserList } = useAddCompanyToUserListMutation(
    company?.id,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleConfirmCreateList = async (listName: string) => {
    if (!listName) return;
    console.log({ listName });
    try {
      const list = await createUserList(listName);
      console.log({ list });
      await handleAddToList(list.id);

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating user list:", error);
    }
  };

  const handleAddToList = async (listId: number) => {
    try {
      await addCompanyToUserList({ listId, companyId: company.id });
    } catch (error) {
      console.error("Error adding company to user list:", error);
    }
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300">
          <IoAdd size={20} /> Add to list
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userLists?.map((list) => (
            <DropdownMenuItem
              key={list.id}
              onClick={() => handleAddToList(list.id)}
            >
              {list.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            <IoAdd size={20} /> Add new list
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <InputDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmCreateList}
        title="Create a new list"
        description="Enter the name for your new list."
        placeholder="New list name"
        confirmButtonText="Create"
      />
    </>
  );
}
