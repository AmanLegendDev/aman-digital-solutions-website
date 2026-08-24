type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
};

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {label}

        {required && (
          <span className="ml-1 text-[#FFC400]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={[
          "w-full rounded-xl border bg-[#0D0D0D]",
          "px-4 py-3 text-sm text-white",
          "outline-none transition",
          "placeholder:text-neutral-700",
          error
            ? "border-red-500/50"
            : "border-white/[0.08] focus:border-[#FFC400]/50",
        ].join(" ")}
      />

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}