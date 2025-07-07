export function Button({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
}) {
  const className =
    variant === "destructive"
      ? "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      : "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded";
  return <button className={className} onClick={onClick}>{children}</button>;
}
