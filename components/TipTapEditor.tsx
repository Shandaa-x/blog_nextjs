"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import { useState, useEffect } from "react";

export default function TiptapEditor({
  onChange,
}: {
  onChange: (html: string) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextStyle,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "<p>Write something...</p>",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!isMounted || !editor) {
    return null;
  }

  const handleImageInsert = () => {
    if (typeof window !== 'undefined') {
      const url = window.prompt("Enter image URL:");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  };

  const handleLinkInsert = () => {
    if (typeof window !== 'undefined') {
      const url = window.prompt("Enter URL:");
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  return (
    <div className="border rounded p-4 dark:bg-gray-700">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "0") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(value) as 1 | 2 | 3 })
                .run();
            }
          }}
          className="border rounded p-1"
        >
          <option value="0">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="border rounded px-2"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="border rounded px-2"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="border rounded px-2"
        >
          <u>U</u>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="border rounded px-2"
        >
          • Bullet
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="border rounded px-2"
        >
          1. List
        </button>

        <button
          onClick={handleImageInsert}
          className="border rounded px-2"
        >
          🖼️ Image
        </button>

        <button
          onClick={handleLinkInsert}
          className="border rounded px-2"
        >
          🔗 Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[300px]" />
    </div>
  );
}
