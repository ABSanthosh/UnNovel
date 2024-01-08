import { Editor as coreEditor, Range } from "@tiptap/core";
import { Icons } from "../Icons";

interface CommandProps {
  editor: coreEditor;
  range: Range;
}
export const getSuggestionItems = [
  {
    title: "Heading 1",
    description: "Big section heading",
    searchTerms: ["heading", "title", "h1"],
    command: ({ editor, range }: { editor: coreEditor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 1 })
        .run();
    },
    icon: Icons.h1,
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    searchTerms: ["heading", "title", "h2"],
    command: ({ editor, range }: { editor: coreEditor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 2 })
        .run();
    },
    icon: Icons.h2,
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    searchTerms: ["heading", "title", "h3"],
    command: ({ editor, range }: { editor: coreEditor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 3 })
        .run();
    },
    icon: Icons.h3,
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: Icons.todo,
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["bullet", "list", "unordered"],
    command: ({ editor }: { editor: coreEditor; range: Range }) => {
      editor.chain().focus().toggleBulletList().run();
    },
    icon: Icons.bullet,
  },
  {
    title: "Numbered List",
    description: "Create a numbered list.",
    searchTerms: ["number", "list", "ordered"],
    command: ({ editor }: { editor: coreEditor; range: Range }) => {
      editor.chain().focus().toggleOrderedList().run();
    },
    icon: Icons.number,
  },
  {
    title: "Quote",
    description: "Capture a quote block.",
    searchTerms: ["quote", "blockquote"],
    command: ({ editor }: { editor: coreEditor; range: Range }) => {
      editor.chain().focus().toggleBlockquote().run();
    },
    icon: Icons.quote,
  },
  {
    title: "Code",
    description: "Capture code block.",
    searchTerms: ["code", "pre", "program"],
    command: ({ editor }: { editor: coreEditor; range: Range }) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
    icon: Icons.code,
  },
] as {
  title: string;
  description?: string;
  searchTerms?: string[];
  icon?: JSX.Element;
  command?: ({ editor, range }: { editor: coreEditor; range: Range }) => void;
}[];
