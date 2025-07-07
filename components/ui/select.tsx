// components/ui/select.tsx
import { ReactNode } from "react";

export function Select({ value, onValueChange, children }: {
  value: string;
  onValueChange: (val: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="border p-2 rounded"
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectValue() {
  return null;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ children, value }: { children: ReactNode; value: string }) {
  return <option value={value}>{children}</option>;
}
