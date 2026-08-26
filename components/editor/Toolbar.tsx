"use client";

import type { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Code2,
  Link2,
 Play,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
};

import MediaUploader from "./ImageUploader";

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  function Button({
    onClick,
    active = false,
    disabled = false,
    label,
    children,
  }: ToolbarButtonProps) {
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        disabled={disabled}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        onClick={onClick}
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center",
          "rounded-lg border transition-all duration-150",
          "disabled:cursor-not-allowed disabled:opacity-30",
          active
            ? "border-[#FFC400]/40 bg-[#FFC400]/10 text-[#FFC400]"
            : "border-transparent text-neutral-400 hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-white",
        ].join(" ")}
      >
        {children}
      </button>
    );
  }

  function Divider() {
    return (
      <div className="mx-1 h-6 w-px shrink-0 bg-white/[0.08]" />
    );
  }

  return (
    <div
      className="
        sticky
        top-0
        z-30
        border-b
        border-white/[0.08]
        bg-[#0A0A0A]/95
        px-3
        py-2
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          min-w-max
          items-center
          gap-1
          overflow-x-auto
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* =================================================
            HISTORY
        ================================================= */}

        <Button
          label="Undo"
          disabled={!editor.can().undo()}
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <Undo2 size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Redo"
          disabled={!editor.can().redo()}
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <Redo2 size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            HEADINGS
        ================================================= */}

        <Button
          label="Heading 1"
          active={editor.isActive("heading", {
            level: 1,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
        >
          <Heading1 size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Heading 2"
          active={editor.isActive("heading", {
            level: 2,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          <Heading2 size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Heading 3"
          active={editor.isActive("heading", {
            level: 3,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
        >
          <Heading3 size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            TEXT
        ================================================= */}

        <Button
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold size={17} strokeWidth={2.2} />
        </Button>

        <Button
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic size={17} strokeWidth={2} />
        </Button>

        <Button
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <Underline size={17} strokeWidth={2} />
        </Button>

        <Button
          label="Highlight"
          active={editor.isActive("highlight")}
          onClick={() =>
            editor.chain().focus().toggleHighlight().run()
          }
        >
          <Highlighter size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            BLOCKS
        ================================================= */}

        <Button
          label="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
        >
          <Quote size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()
          }
        >
          <Code2 size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Horizontal divider"
          onClick={() =>
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          }
        >
          <Minus size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            LISTS
        ================================================= */}

        <Button
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          <List size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          <ListOrdered size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Task list"
          active={editor.isActive("taskList")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleTaskList()
              .run()
          }
        >
          <ListChecks size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            ALIGNMENT
        ================================================= */}

        <Button
          label="Align left"
          active={editor.isActive({
            textAlign: "left",
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("left")
              .run()
          }
        >
          <AlignLeft size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Align center"
          active={editor.isActive({
            textAlign: "center",
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("center")
              .run()
          }
        >
          <AlignCenter size={17} strokeWidth={1.8} />
        </Button>

        <Button
          label="Align right"
          active={editor.isActive({
            textAlign: "right",
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("right")
              .run()
          }
        >
          <AlignRight size={17} strokeWidth={1.8} />
        </Button>

        <Divider />

        {/* =================================================
            LINK
        ================================================= */}

        <Button
          label="Add link"
          active={editor.isActive("link")}
          onClick={() => {
            const previousUrl =
              editor.getAttributes("link").href;

            const url = window.prompt(
              "Enter URL",
              previousUrl || "https://",
            );

            if (url === null) return;

            if (url.trim() === "") {
              editor
                .chain()
                .focus()
                .unsetLink()
                .run();

              return;
            }

            editor
              .chain()
              .focus()
              .setLink({
                href: url.trim(),
              })
              .run();
          }}
        >
          <Link2 size={17} strokeWidth={1.8} />
        </Button>

        {/* =================================================
            IMAGE
        ================================================= */}

     {/* =================================================
    MEDIA
================================================= */}

<MediaUploader
  editor={editor}
  type="image"
/>

<MediaUploader
  editor={editor}
  type="video"
/>

{/* =================================================
    YOUTUBE
================================================= */}

<Button
  label="Add YouTube video"
  onClick={() => {
    const url = window.prompt(
      "Enter YouTube URL",
      "https://youtube.com/watch?v=",
    );

    if (!url?.trim()) return;

    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: url.trim(),
      })
      .run();
  }}
>
  <Play
    size={17}
    strokeWidth={1.8}
  />
</Button>

        {/* =================================================
            YOUTUBE
        ================================================= */}

        <Button
          label="Add YouTube video"
          onClick={() => {
            const url = window.prompt(
              "Enter YouTube URL",
              "https://youtube.com/watch?v=",
            );

            if (!url?.trim()) return;

            editor
              .chain()
              .focus()
              .setYoutubeVideo({
                src: url.trim(),
              })
              .run();
          }}
        >
          <Play size={17} strokeWidth={1.8} />
        </Button>
      </div>
    </div>
  );
}