export function Select({ value, onValueChange, children }: any) {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
}

export function SelectTrigger({ children }: any) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <option disabled>{placeholder}</option>;
}

export function SelectItem({ children, value }: any) {
  return <option value={value}>{children}</option>;
}

export function SelectContent({ children }: any) {
  return <>{children}</>;
}
