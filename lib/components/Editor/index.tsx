import "./editor.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import { SlashMenu } from "../Suggestion/SlashMenu";
import { getSuggestionItems } from "../Suggestion/Commands";
import renderItems from "../Suggestion/ListRender";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlock from "@tiptap/extension-code-block";
import BulletList from "@tiptap/extension-bullet-list";
import Blockquote from "@tiptap/extension-blockquote";
import Text from "@tiptap/extension-text";
import OrderedList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import HardBreak from "@tiptap/extension-hard-break";

export default function Editor({
  items = [],
  initialContent = "",
}: {
  items?: any[];
  initialContent?: string;
}) {
  const editor = useEditor({
    extensions: [
      // StarterKit,
      ListItem,
      Document,
      HardBreak,
      Paragraph,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlock,
      BulletList.configure({
        keepMarks: true,
      }),
      Text,
      Bold,
      Italic,
      Blockquote,
      OrderedList.configure({
        keepMarks: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: 'Press "/" for commands',
      }),
      SlashMenu.configure({
        suggestion: {
          items: ({ query }: { query: string }) =>
            [...items, ...getSuggestionItems]
              .filter((item) =>
                item?.title.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 10),
          render: renderItems,
        },
      }),
    ],
    content: initialContent,
  });
  return <EditorContent className="UNEditor" editor={editor} />;
}
