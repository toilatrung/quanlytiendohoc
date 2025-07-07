// components/ui/button.tsx
import { ReactNode } from "react";

export function Button({ children, onClick, variant = "default" }: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
}) {
  const style = variant === "destructive" ? "bg-red-500 text-white" : "bg-blue-500 text-white";
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-md ${style}`}>
      {children}
    </button>
  );
}
