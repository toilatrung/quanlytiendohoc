// components/ui/card.tsx
import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="border rounded-xl shadow-md">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
