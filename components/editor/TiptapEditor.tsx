
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  EditorContent,
  useEditor,
  type Editor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { TableKit } from "@tiptap/extension-table";

import {
  Placeholder,
  CharacterCount,
} from "@tiptap/extensions";

import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";

import {
  TaskList,
  TaskItem,
} from "@tiptap/extension-list";

import {
  BookOpen,
  Check,
  Clock3,
  Maximize2,
  Minimize2,
  Type,
} from "lucide-react";

import Toolbar from "./Toolbar";
import "./EditorStyles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function getReadingTime(words: number): number {
  return Math.max(1, Math.ceil(words / 200));
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function TiptapEditor({
  value,
  onChange,
}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML());
    },
    [onChange]
  );

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),

      Underline,

      TextStyle,

      Color,

      Highlight.configure({
        multicolor: false,
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "ads-editor-image",
          loading: "lazy",
        },
      }),

      TableKit.configure({
        table: {
          resizable: true,
          allowTableNodeSelection: true,
          HTMLAttributes: {
            class: "ads-editor-table",
          },
        },
        tableHeader: {
          HTMLAttributes: {
            class: "ads-editor-table-header",
          },
        },
        tableCell: {
          HTMLAttributes: {
            class: "ads-editor-table-cell",
          },
        },
      }),

      Placeholder.configure({
        placeholder:
          "Start writing your article...\n\nAdd headings, format text, insert images, or create a comparison table.",
        emptyEditorClass: "is-editor-empty",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

      Youtube.configure({
        controls: true,
        nocookie: true,
        allowFullscreen: true,
        HTMLAttributes: {
          loading: "lazy",
          title: "Embedded YouTube video",
        },
      }),

      TaskList,

      TaskItem.configure({
        nested: true,
      }),

      CharacterCount,
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class: "ads-tiptap-canvas",
        spellcheck: "true",
        "aria-label": "Blog article editor",
        "aria-multiline": "true",
      },
    },

    onUpdate: handleUpdate,
  });

  /*
   * Synchronize the editor when a different article is loaded.
   * Do not reset the selection during ordinary typing.
   */
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    const nextHTML = value || "";

    if (currentHTML !== nextHTML) {
      editor.commands.setContent(nextHTML, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  /*
   * Escape closes fullscreen mode.
   */
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  /*
   * Lock background scrolling while the editor is fullscreen.
   */
  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  const wordCount =
    editor?.storage.characterCount?.words?.() ?? 0;

  const characterCount =
    editor?.storage.characterCount?.characters?.() ?? 0;

  const readingTime = getReadingTime(wordCount);

  const handleFullscreen = () => {
    setIsFullscreen((current) => !current);
  };

  const containerClass = isFullscreen
    ? [
        "fixed inset-3 z-[100] flex flex-col",
        "overflow-hidden rounded-2xl",
        "border border-white/10 bg-[#0b0b0b]",
        "shadow-2xl sm:inset-5",
      ].join(" ")
    : [
        "relative flex flex-col overflow-hidden",
        "rounded-2xl border border-white/10",
        "bg-[#0b0b0b]",
        "shadow-[0_16px_50px_rgba(0,0,0,0.18)]",
      ].join(" ");

  return (
    <>
      {isFullscreen && (
        <button
          type="button"
          aria-label="Exit fullscreen"
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[90] cursor-default bg-black/75"
        />
      )}

      <section
        aria-label="Blog content editor"
        className={containerClass}
      >
        {/* EDITOR HEADER */}

        <div
          className="
            relative z-40 flex shrink-0 flex-wrap
            items-center justify-between gap-3
            border-b border-white/[0.08]
            bg-[#101010] px-4 py-3 sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl
                border border-[#ffc400]/20
                bg-[#ffc400]/[0.09]
              "
            >
              <BookOpen
                size={19}
                className="text-[#ffc400]"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                Article editor
              </h3>

              <p className="mt-0.5 text-xs text-neutral-500">
                Rich text · Tables · Colour formatting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                hidden items-center gap-1.5
                rounded-full border border-white/[0.08]
                bg-white/[0.025] px-2.5 py-1.5
                text-[11px] text-neutral-400 sm:inline-flex
              "
            >
              <Check
                size={13}
                className="text-emerald-400"
                aria-hidden="true"
              />
              Editing
            </span>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label={
                isFullscreen
                  ? "Exit fullscreen editor"
                  : "Open fullscreen editor"
              }
              aria-pressed={isFullscreen}
              className="
                inline-flex h-9 items-center
                justify-center gap-2 rounded-lg
                border border-white/10 bg-white/[0.04]
                px-3 text-xs font-medium text-neutral-300
                transition hover:border-[#ffc400]/30
                hover:bg-[#ffc400]/[0.08]
                hover:text-[#ffc400]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#ffc400]/70
              "
            >
              {isFullscreen ? (
                <Minimize2 size={15} aria-hidden="true" />
              ) : (
                <Maximize2 size={15} aria-hidden="true" />
              )}

              <span className="hidden sm:inline">
                {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              </span>
            </button>
          </div>
        </div>

        {/* FORMATTING TOOLBAR */}

        <div className="relative z-30 shrink-0">
          <Toolbar editor={editor} />
        </div>

        {/* EDITOR WRITING AREA */}

        <div
          className={[
            "min-h-0 flex-1 bg-[#0b0b0b]",
            isFullscreen
              ? "overflow-y-auto"
              : "overflow-visible",
          ].join(" ")}
        >
          <EditorContent
            editor={editor}
            className="ads-tiptap-editor-content"
          />
        </div>

        {/* LIVE DOCUMENT STATISTICS */}

        <footer
          className="
            relative z-20 flex shrink-0 flex-wrap
            items-center justify-between gap-3
            border-t border-white/[0.08]
            bg-[#101010] px-4 py-3 sm:px-5
          "
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Type
                size={14}
                className="text-neutral-500"
                aria-hidden="true"
              />

              <span>
                <strong className="font-semibold text-neutral-200">
                  {formatCount(wordCount)}
                </strong>{" "}
                words
              </span>
            </div>

            <span
              aria-hidden="true"
              className="h-3.5 w-px bg-white/10"
            />

            <span className="text-xs text-neutral-500">
              {formatCount(characterCount)} characters
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Clock3
                size={13}
                aria-hidden="true"
                className="text-[#ffc400]"
              />

              {readingTime} min read
            </span>

            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-emerald-500/15
                bg-emerald-500/[0.06] px-2.5 py-1
                text-[10px] font-medium text-emerald-400
              "
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              Live count
            </span>
          </div>
        </footer>
      </section>
    </>
  );
}
