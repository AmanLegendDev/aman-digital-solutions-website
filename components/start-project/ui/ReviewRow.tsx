type Props = {
  label: string;
  value: string;
};

export default function ReviewRow({
  label,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
      <span className="text-xs text-neutral-600">
        {label}
      </span>

      <span className="text-left text-sm text-neutral-300 sm:text-right">
        {value || "—"}
      </span>
    </div>
  );
}