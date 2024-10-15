"use client";

import { cn } from "@/utils/ui";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children, icon, className, ...rest } = props;
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-1 rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300",
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
