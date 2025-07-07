export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border shadow p-4 bg-white">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
