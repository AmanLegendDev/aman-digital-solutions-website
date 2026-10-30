
"use client";

import type { ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Columns2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Link2,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Play,
  Plus,
  Quote,
  Redo2,
  Rows2,
  Table2,
  Trash2,
  Undo2,
  Underline as UnderlineIcon,
} from "lucide-react";

import MediaUploader from "./ImageUploader";

interface Props {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={[
        "inline-flex h-9 w-9 shrink-0 items-center justify-center",
        "rounded-lg border transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#FFC400]/70",
        "disabled:pointer-events-none disabled:opacity-30",
        active
          ? "border-[#FFC400]/30 bg-[#FFC400]/10 text-[#FFC400]"
          : "border-transparent text-neutral-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-1 h-6 w-px shrink-0 bg-white/10"
    />
  );
}

function ToolbarGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 items-center gap-1"
    >
      {children}
    </div>
  );
}

const TEXT_COLORS = [
  { name: "White", value: "#F8FAFC" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Yellow", value: "#FACC15" },
  { name: "Green", value: "#22C55E" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Sky", value: "#38BDF8" },
  { name: "Purple", value: "#A78BFA" },
  { name: "Pink", value: "#EC4899" },
  { name: "Muted grey", value: "#A3A3A3" },
];

function ColorPicker({ editor }: { editor: Editor }) {
  const currentColor =
    editor.getAttributes("textStyle").color || "#F8FAFC";

  return (
    <div
      role="group"
      aria-label="Text colour"
      className="flex shrink-0 items-center gap-1"
    >
      <label
        title="Choose custom text colour"
        className="
          relative flex h-9 w-10 shrink-0 cursor-pointer
          items-center justify-center overflow-hidden
          rounded-lg border border-white/10 bg-white/[0.04]
          transition hover:border-[#FFC400]/40
        "
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded border border-white/20"
          style={{ backgroundColor: currentColor }}
        />
        <input
          type="color"
          aria-label="Choose custom text colour"
          value={currentColor}
          onChange={(event) => {
            editor.chain().focus().setColor(event.target.value).run();
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <div className="flex max-w-[240px] shrink-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TEXT_COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            title={`Text colour: ${color.name}`}
            aria-label={`Text colour: ${color.name}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              editor.chain().focus().setColor(color.value).run();
            }}
            className="
              h-5 w-5 shrink-0 rounded-full
              border border-white/20 transition
              hover:scale-110 hover:border-white
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#FFC400]
            "
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>

      <button
        type="button"
        title="Remove text colour"
        aria-label="Remove text colour"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().unsetColor().run()}
        className="
          ml-1 h-8 shrink-0 rounded-md px-2
          text-[11px] text-neutral-400
          hover:bg-white/[0.06] hover:text-white
        "
      >
        Reset
      </button>
    </div>
  );
}

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  const inTable = editor.isActive("table");

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt(
      "Enter the link URL",
      previousUrl || "https://"
    );

    if (url === null) return;

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      const parsedUrl = new URL(trimmedUrl);

      if (
        !["http:", "https:", "mailto:", "tel:"].includes(
          parsedUrl.protocol
        )
      ) {
        window.alert(
          "Please enter a valid HTTP, HTTPS, email or phone link."
        );
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmedUrl })
        .run();
    } catch {
      window.alert("Please enter a valid URL, including https://.");
    }
  };

  const addYouTubeVideo = () => {
    const url = window.prompt(
      "Enter the YouTube video URL",
      "https://www.youtube.com/watch?v="
    );

    if (!url?.trim()) return;

    editor.chain().focus().setYoutubeVideo({ src: url.trim() }).run();
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div
      className="
        sticky top-0 z-30 border-b border-white/[0.09]
        bg-[#101010]/[0.98] px-3 py-2.5
        shadow-[0_8px_24px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      <div className="flex flex-col gap-2">
        <div
          className="
            flex items-center gap-2 overflow-x-auto
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          <ToolbarGroup label="Undo and redo">
            <ToolbarButton
              label="Undo"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Redo"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 size={17} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Headings">
            <ToolbarButton
              label="Heading 1"
              active={editor.isActive("heading", { level: 1 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 size={18} />
            </ToolbarButton>

            <ToolbarButton
              label="Heading 2"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 size={18} />
            </ToolbarButton>

            <ToolbarButton
              label="Heading 3"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 size={18} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Text formatting">
            <ToolbarButton
              label="Bold"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Italic"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Underline"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Highlight"
              active={editor.isActive("highlight")}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <Highlighter size={17} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Lists">
            <ToolbarButton
              label="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
            >
              <List size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Numbered list"
              active={editor.isActive("orderedList")}
              onClick={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
            >
              <ListOrdered size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Checklist"
              active={editor.isActive("taskList")}
              onClick={() =>
                editor.chain().focus().toggleTaskList().run()
              }
            >
              <ListChecks size={17} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Content blocks">
            <ToolbarButton
              label="Blockquote"
              active={editor.isActive("blockquote")}
              onClick={() =>
                editor.chain().focus().toggleBlockquote().run()
              }
            >
              <Quote size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Code block"
              active={editor.isActive("codeBlock")}
              onClick={() =>
                editor.chain().focus().toggleCodeBlock().run()
              }
            >
              <Code2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Horizontal divider"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus size={17} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Text alignment">
            <ToolbarButton
              label="Align left"
              active={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Align center"
              active={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Align right"
              active={editor.isActive({ textAlign: "right" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight size={17} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Links and media">
            <ToolbarButton
              label="Add or edit link"
              active={editor.isActive("link")}
              onClick={addLink}
            >
              <Link2 size={17} />
            </ToolbarButton>

            <MediaUploader editor={editor} type="image" />
            <MediaUploader editor={editor} type="video" />

            <ToolbarButton
              label="Embed YouTube video"
              onClick={addYouTubeVideo}
            >
              <Play size={17} />
            </ToolbarButton>
          </ToolbarGroup>
        </div>

        <div
          className="
            flex flex-wrap items-center gap-x-3 gap-y-2
            border-t border-white/[0.06] pt-2
          "
        >
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            Text colour
          </span>

          <ColorPicker editor={editor} />

          <ToolbarDivider />

          <ToolbarGroup label="Table tools">
            <ToolbarButton
              label="Insert 3 by 3 table with header"
              onClick={insertTable}
            >
              <Table2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Add row before"
              disabled={!inTable}
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <Rows2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Add row after"
              disabled={!inTable}
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <Plus size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Delete row"
              disabled={!inTable}
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <Trash2 size={15} />
            </ToolbarButton>

            <ToolbarButton
              label="Add column before"
              disabled={!inTable}
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <Columns2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Add column after"
              disabled={!inTable}
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <Plus size={17} />
            </ToolbarButton>

            <ToolbarButton
              label="Delete column"
              disabled={!inTable}
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <Trash2 size={15} />
            </ToolbarButton>

            <ToolbarButton
              label="Delete entire table"
              disabled={!inTable}
              onClick={() => {
                if (window.confirm("Delete this entire table?")) {
                  editor.chain().focus().deleteTable().run();
                }
              }}
            >
              <Table2 size={17} />
            </ToolbarButton>
          </ToolbarGroup>
        </div>
      </div>
    </div>
  );
}
