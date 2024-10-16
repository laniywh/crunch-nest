import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface InputDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (inputValue: string) => Promise<void>;
  title: string;
  description: string;
  placeholder: string;
  confirmButtonText: string;
}

export function InputDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  placeholder,
  confirmButtonText,
}: InputDialogProps) {
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm(inputValue);
      onOpenChange(false);
      setInputValue("");
      setIsInputValid(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const trimmedValue = e.target.value.trim();
    setIsInputValid(trimmedValue !== "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        </div>
        <DialogFooter>
          <button
            onClick={handleConfirm}
            disabled={!isInputValid}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {confirmButtonText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
