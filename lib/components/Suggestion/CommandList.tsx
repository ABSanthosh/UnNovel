import { useState, useEffect, useCallback } from "react";
import { Editor as coreEditor, Range } from "@tiptap/core";

interface CommandListProps {
  items: any[];
  command: (item: any) => void;
  editor: coreEditor;
  range: Range;
}

function CommandList({ items, command, editor }: CommandListProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];

      command(item);
    },
    [editor, items, command]
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (event: KeyboardEvent) => {
      // console.log(event.key);
      if (navigationKeys.includes(event.key)) {
        event.preventDefault();
        if (event.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }

        if (event.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }

        if (event.key === "Enter") {
          console.log("enter");
          selectItem(selectedIndex);
          return true;
        }

        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, items, selectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  return (
    <ul className="SlashMenu">
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <button
              className={`SlashMenu__item FancyButton ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div className="SlashMenu__item--left">
                {item.icon && (
                  <span className="SlashMenu__icon">{item.icon}</span>
                )}
              </div>

              <div className="SlashMenu__item--right">
                <h4>{item.element || item.title}</h4>
                {item.description && (
                  <span title={item.description}>{item.description}</span>
                )}
              </div>
            </button>
          );
        })
      ) : (
        <span>
          No suggestions available.
          <br />
          <br />
        </span>
      )}
    </ul>
  );
}

export default CommandList;
