'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// Dynamically import Quill to avoid SSR issues
const Quill = dynamic(() => import('quill'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-transparent" />
});

export type RichTextEditorHandle = {
  getContent: () => string;
};

type RichTextEditorProps = {
  defaultValue?: string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(({ defaultValue }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && editorRef.current && !quillRef.current) {
      // Initialize Quill only on the client side
      const Quill = require('quill');
      quillRef.current = new Quill(editorRef.current, {
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

      const editor = editorRef.current.querySelector('.ql-editor') as HTMLDivElement;
      if (editor) {
        editor.style.color = 'white';
        editor.style.caretColor = 'white'; 
      }
    }

    if (quillRef.current && defaultValue) {
      quillRef.current.root.innerHTML = defaultValue;
    }

    return () => {
      quillRef.current = null;
    };
  }, [defaultValue, isClient]);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return '';
    },
  }));

  if (!isClient) {
    return <div className="h-[300px] bg-transparent" />;
  }

  return (
    <div
      ref={editorRef}
      className="h-[300px] bg-transparent"
    />
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
