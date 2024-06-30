import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";

const CodeEditor = ({ language, code, setCode }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      const extensions = {
        javascript: javascript(),
        python3: python(),
        cpp: cpp(),
        java: java(),
      };

      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          extensions[language],
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.changes) {
              setCode(update.state.doc.toString());
            }
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      return () => {
        view.destroy();
      };
    }
  }, [editorRef, language, code, setCode]);

  return <div ref={editorRef} />;
};

export default CodeEditor;
