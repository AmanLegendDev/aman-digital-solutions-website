"use client";

import {
  ArrowUp,
  Loader2,
} from "lucide-react";
import {
  useRef,
} from "react";
import type {
  FormEvent,
  KeyboardEvent,
} from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function AMIInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: Props) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      disabled ||
      !value.trim()
    ) {
      return;
    }

    onSubmit();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (
        !disabled &&
        value.trim()
      ) {
        onSubmit();
      }
    }
  };

  const handleChange = (
    nextValue: string,
  ) => {
    onChange(nextValue);

    requestAnimationFrame(() => {
      const element =
        textareaRef.current;

      if (!element) {
        return;
      }

      element.style.height =
        "auto";

      element.style.height =
        `${Math.min(
          element.scrollHeight,
          140,
        )}px`;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto
        w-full
        max-w-3xl
      "
    >
      <div
        className="
          flex
          items-end
          gap-2
          rounded-2xl
          border
          border-white/[0.1]
          bg-white/[0.055]
          p-2
          shadow-[0_16px_60px_rgba(0,0,0,0.2)]
          transition
          focus-within:border-[#FFC400]/35
          focus-within:bg-white/[0.07]
        "
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) =>
            handleChange(
              event.target.value,
            )
          }
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={2000}
          placeholder="Ask AMI anything..."
          aria-label="Message AMI"
          className="
            max-h-[140px]
            min-h-[44px]
            flex-1
            resize-none
            bg-transparent
            px-3
            py-3
            text-sm
            leading-6
            text-white
            outline-none
            placeholder:text-white/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        <button
          type="submit"
          disabled={
            disabled ||
            !value.trim()
          }
          aria-label="Send message"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#FFC400]
            text-black
            transition
            hover:bg-[#ffd43b]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          {disabled ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <ArrowUp
              size={18}
              strokeWidth={2.5}
            />
          )}
        </button>
      </div>

      <div
        className="
          mt-2
          px-2
          text-[10px]
          text-white/25
        "
      >
        Enter to send · Shift + Enter for a new line
      </div>
    </form>
  );
}