import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CreateListDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreateList: (listName: string) => Promise<void>;
}

export function CreateListDialog({
  isOpen,
  onOpenChange,
  onCreateList,
}: CreateListDialogProps) {
  const [newListName, setNewListName] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const handleCreateList = async () => {
    try {
      await onCreateList(newListName);
      onOpenChange(false);
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
}
