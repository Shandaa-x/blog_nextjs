'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
  getContent: () => string;
};

type RichTextEditorProps = {
  defaultValue?: string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(({ defaultValue }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isClient, setIsClient] = useState(false); // State to track if we are on the client side

  useEffect(() => {
    // Check if we are in a browser environment
    setIsClient(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (isClient && editorRef.current && !quillRef.current) {
      // Initialize Quill only on the client side
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
    // Return a placeholder or an empty div during SSR
    return <div style={{ height: '300px', backgroundColor: 'transparent' }} />;
  }

  return (
    <div
      ref={editorRef}
      style={{
        height: '300px',
        backgroundColor: 'transparent',
      }}
      className="custom-quill"
    />
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
