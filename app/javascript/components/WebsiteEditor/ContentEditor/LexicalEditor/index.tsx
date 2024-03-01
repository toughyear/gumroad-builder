import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ImagePlugin from "./ImagePlugin";

import React from "react";
import ToolbarPlugin from "./Toolbarplugin";
import AutoLinkPlugin from "./AutoLinkPlugin";
import CodeHighlightPlugin from "./CodeHighlightPlugin";
import { ImageNode } from "./Nodes/ImageNode";

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

const codeHighlightTheme = {
  atrule: "text-blue-600",
  attr: "text-blue-600",
  boolean: "text-orange-600",
  builtin: "text-green-600",
  cdata: "text-gray-600",
  char: "text-green-600",
  class: "text-pink-600",
  "class-name": "text-pink-600",
  comment: "text-gray-600",
  constant: "text-orange-600",
  deleted: "text-orange-600",
  doctype: "text-gray-600",
  entity: "text-yellow-600",
  function: "text-pink-600",
  important: "text-yellow-600",
  inserted: "text-green-600",
  keyword: "text-blue-600",
  namespace: "text-yellow-600",
  number: "text-orange-600",
  operator: "text-yellow-600",
  prolog: "text-gray-600",
  property: "text-orange-600",
  punctuation: "text-gray-500",
  regex: "text-yellow-600",
  selector: "text-green-600",
  string: "text-green-600",
  symbol: "text-orange-600",
  tag: "text-orange-600",
  url: "text-yellow-600",
  variable: "text-yellow-600",
};

export function LexicalEditor(props: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={props.config}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoLinkPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <ImagePlugin captionsEnabled={true} />
      <AutoFocusPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div
      className='absolute top-20 left-5 opacity-50'
      onClick={() => {
        editor.focus();
      }}
    >
      Start writing...
    </div>
  );
};

export default function Editor() {
  return (
    <div
      id='editor-wrapper'
      className='relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2'
    >
      <LexicalEditor
        config={{
          namespace: "lexical-editor",
          theme: {
            root: "p-4 border-black border rounded h-full max-h-[600px] overflow-y-scroll min-h-[200px] focus:outline-none focus-visible:border-black",
            link: "cursor-pointer text-blue-500 hover:underline",
            text: {
              bold: "font-semibold",
              underline: "underline",
              italic: "italic",
              strikethrough: "line-through",
              underlineStrikethrough: "underline line-through",
              code: "bg-slate-100 text-slate-900 rounded p-1",
            },
            heading: {
              h1: "text-4xl font-bold",
              h2: "text-3xl font-bold",
              h3: "text-2xl font-bold",
              h4: "text-xl font-bold",
              h5: "text-lg font-bold",
              h6: "text-base font-bold",
            },
            list: {
              ul: "list-disc list-inside",
              ol: "list-decimal list-inside",
            },
            quote: "border-l-4 border-slate-500 pl-4 italic",
            codeHighlight: codeHighlightTheme,
          },
          // Any custom nodes go here
          nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
            ImageNode,
          ],
          onError: (error) => {
            console.log(error);
          },
        }}
      />
    </div>
  );
}
