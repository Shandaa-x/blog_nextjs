'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import dynamic from 'next/dynamic';
import type Quill from 'quill';

interface QuillDivElement extends HTMLDivElement {
  quill?: Quill;
}

// Dynamically import Quill to avoid SSR issues
const QuillEditor = dynamic(
  async () => {
    const { default: Quill } = await import('quill');
    await import('quill/dist/quill.snow.css');
    
    return ({ forwardedRef, defaultValue }: { forwardedRef: React.RefObject<QuillDivElement>; defaultValue?: string }) => {
      const [isClient, setIsClient] = useState(false);

      useEffect(() => {
        setIsClient(true);
      }, []);

      useEffect(() => {
        if (isClient && forwardedRef.current && !forwardedRef.current.quill) {
          const quill = new Quill(forwardedRef.current, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            },
            placeholder: 'Write something...',
          });

          forwardedRef.current.quill = quill;

          const editor = forwardedRef.current.querySelector('.ql-editor') as HTMLDivElement;
          if (editor) {
            editor.style.color = 'white';
            editor.style.caretColor = 'white';
          }

          if (defaultValue) {
            quill.root.innerHTML = defaultValue;
          }
        }
      }, [isClient, forwardedRef, defaultValue]);

      return null;
    };
  },
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-transparent border border-gray-700 rounded-lg animate-pulse" />,
  }
);

export type RichTextEditorHandle = {
  getContent: () => string;
};

type RichTextEditorProps = {
  defaultValue?: string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(({ defaultValue }, ref) => {
  const editorRef = useRef<QuillDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (editorRef.current?.quill) {
        return editorRef.current.quill.root.innerHTML;
      }
      return '';
    },
  }));

  if (!isClient) {
    return <div className="h-[300px] bg-transparent border border-gray-700 rounded-lg animate-pulse" />;
  }

  return (
    <div className="relative">
      <div
        ref={editorRef}
        className="h-[300px] bg-transparent"
      />
      <QuillEditor forwardedRef={editorRef} defaultValue={defaultValue} />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
