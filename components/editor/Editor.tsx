"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";
import VideoExtension from "./VideoExtension";
import StarterKit from "@tiptap/starter-kit";

import {
  Placeholder,
  CharacterCount,
} from "@tiptap/extensions";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { TableKit } from "@tiptap/extension-table";

import {
  TaskList,
  TaskItem,
} from "@tiptap/extension-list";

import {
  all,
  createLowlight,
} from "lowlight";

import Toolbar from "./Toolbar";
import BubbleMenu from "./BubbleMenu";
import FloatingMenu from "./FloatingMenu";
import CharacterCounter from "./CharacterCounter";
import ReadingTime from "./ReadingTime";
import FullscreenButton from "./FullscreenButton";
import AutosaveBadge from "./AutosaveBadge";

const lowlight = createLowlight(all);

interface EditorProps {
  value?: string;

  onChange?: (html: string) => void;
}

export default function Editor({
  value = "",
  onChange,
}: EditorProps) {
  const [fullscreen, setFullscreen] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(true);

  const [error, setError] =
    useState(false);

  const autosaveTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const editor = useEditor({
    immediatelyRender: false,

   extensions: [
  StarterKit.configure({
    codeBlock: false,
  }),

  CodeBlockLowlight.configure({
    lowlight,
  }),

  Placeholder.configure({
    placeholder:
      "Start writing your amazing article...",
  }),

  Highlight,

  Image,

  Youtube.configure({
    controls: true,
    nocookie: true,
  }),

  TextAlign.configure({
    types: [
      "heading",
      "paragraph",
    ],
  }),

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  TableKit.configure({
    table: {
      resizable: true,
    },
  }),

  CharacterCount.configure({
    limit: 50000,
  }),

  VideoExtension,
],

    content: value,

    editorProps: {
      attributes: {
        class:
          "editor-content min-h-[500px] focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      const html = editor.getHTML();

      setSaving(true);
      setSaved(false);
      setError(false);

      onChange?.(html);

      if (autosaveTimeout.current) {
        clearTimeout(
          autosaveTimeout.current,
        );
      }

      autosaveTimeout.current =
        setTimeout(() => {
          setSaving(false);
          setSaved(true);
        }, 700);
    },
  });

  /*
   * Sync external value with editor.
   *
   * Important for edit mode:
   * when existing blog data arrives after
   * the editor has already mounted.
   */
  useEffect(() => {
    if (!editor) return;

    const currentHTML =
      editor.getHTML();

    if (
      value !== currentHTML &&
      value !== undefined
    ) {
      editor.commands.setContent(
        value || "",
        {
          emitUpdate: false,
        },
      );
    }
  }, [editor, value]);

  /*
   * Cleanup autosave timer.
   */
  useEffect(() => {
    return () => {
      if (autosaveTimeout.current) {
        clearTimeout(
          autosaveTimeout.current,
        );
      }
    };
  }, []);

  if (!editor) {
    return (
      <div className="min-h-[550px] rounded-3xl border border-white/[0.08] bg-[#0B0B0B] p-8">
  <div className="animate-pulse text-sm text-neutral-500">
    Loading editor...
  </div>
</div>
    );
  }

  return (
    <div
      className={
        fullscreen
          ? `
            fixed
            inset-0
            z-[9999]
            overflow-auto
            bg-slate-100
            p-4
            sm:p-8
          `
          : ""
      }
    >
    <div
  className="
    overflow-hidden
    rounded-3xl
    border
    border-white/[0.08]
    bg-[#0B0B0B]
    shadow-2xl
    shadow-black/40
  "
>
        {/* TOOLBAR */}

        <Toolbar editor={editor} />

        {/* BUBBLE MENU */}

        <BubbleMenu editor={editor} />

        {/* FLOATING MENU */}

        <FloatingMenu editor={editor} />

        {/* EDITOR */}

       <div
  className="
    min-h-[550px]
    border-y
    border-white/[0.08]
    bg-[#0D0D0D]
    p-6
    sm:p-8
  "
>
          <EditorContent
            editor={editor}
          />
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            bg-slate-50
            px-6
            py-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <CharacterCounter
              editor={editor}
            />

            <AutosaveBadge
              saving={saving}
              saved={saved}
              error={error}
            />

            <ReadingTime
              editor={editor}
            />
          </div>

          <FullscreenButton
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
          />
        </div>
      </div>
    </div>
  );
}