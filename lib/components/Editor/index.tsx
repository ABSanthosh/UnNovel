import StarterKit from "@tiptap/starter-kit";
import "./editor.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import { SlashMenu } from "../Suggestion/SlashMenu";
import getSuggestionItems from "../Suggestion/Commands";
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

export default function Editor() {
  const editor = useEditor({
    extensions: [
      // StarterKit,
      ListItem,
      Document,
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
      SlashMenu.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
    ],
    content: `
      <p>
        Hello World! 🌎️
      </p>
    `,
  });
  return <EditorContent className="UNEditor" editor={editor} />;
}
