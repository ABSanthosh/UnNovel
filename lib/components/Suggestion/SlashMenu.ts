import Suggestion from "@tiptap/suggestion";
import { Editor as coreEditor, Range, Extension } from "@tiptap/core";

export const SlashMenu = Extension.create({
  name: "commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }
          : {
            editor: coreEditor;
            range: Range;
            props: any;
          }
        ) => {
          props.command({ editor, range, props });
        }
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});
