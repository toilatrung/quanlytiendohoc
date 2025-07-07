export function Card({ children }: { children: React.ReactNode }) {
  return <div className="border rounded-md p-4 shadow">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
