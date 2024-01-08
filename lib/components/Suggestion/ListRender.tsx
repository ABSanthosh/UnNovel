import { Editor as coreEditor } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import CommandsList from "./CommandList";

export default function renderItems() {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: {
      editor: coreEditor;
      clientRect: DOMRect;
    }) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: coreEditor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit() {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
}
