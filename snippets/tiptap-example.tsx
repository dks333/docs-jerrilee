import { useEffect, useId, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";
import { TIPTAP_CONTENT } from "./tiptap-content.ts";
import type { TiptapVariant } from "./tiptap-content.ts";
import { EditorToolbar, ReadonlyToolbar } from "./tiptap-toolbar.tsx";
import { createSlashCommands } from "./tiptap-slash-commands.ts";
import type { SlashMenuState } from "./tiptap-slash-commands.ts";
import "./tiptap-example.css";

export function TiptapExample({ variant = "document" }: { variant?: TiptapVariant }) {
  return <DocumentEditor key={variant} variant={variant} />;
}

function DocumentEditor({ variant }: { variant: TiptapVariant }) {
  const [slashMenu, setSlashMenu] = useState<SlashMenuState | null>(null);
  const listboxId = useId();
  const slashCommands = useMemo(() => createSlashCommands(setSlashMenu, listboxId), [listboxId]);
  useEffect(() => {
    if (!slashMenu) return;
    const selected = slashMenu.commands[slashMenu.selectedIndex];
    if (selected)
      document.getElementById(`${listboxId}-${selected.id}`)?.scrollIntoView({ block: "nearest" });
  }, [listboxId, slashMenu]);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: { openOnClick: false } }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit,
      Placeholder.configure({
        placeholder: "Write something, or type / for blocks",
        showOnlyCurrent: true,
      }),
      slashCommands,
    ],
    content: TIPTAP_CONTENT[variant],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-label": "Document editor",
        "aria-multiline": "true",
        spellcheck: "false",
      },
    },
  });

  return (
    <div className="tiptap-example not-prose" aria-busy={!editor}>
      {editor ? (
        <EditorToolbar editor={editor} variant={variant} />
      ) : (
        <ReadonlyToolbar variant={variant} />
      )}
      <div className="tiptap-document">
        {editor ? (
          <EditorContent editor={editor} />
        ) : (
          <div
            className="tiptap"
            role="textbox"
            aria-label="Document editor"
            aria-multiline="true"
            aria-readonly="true"
            contentEditable={false}
            dangerouslySetInnerHTML={{ __html: TIPTAP_CONTENT[variant] }}
          />
        )}
      </div>
      <div className="tiptap-example-footer">
        <span>Type / for blocks</span>
        <span>Changes aren’t saved</span>
      </div>
      {editor && slashMenu && (
        <div className="tiptap-slash-menu" style={{ left: slashMenu.left, top: slashMenu.top }}>
          <div className="tiptap-slash-heading">Insert a block</div>
          <div id={listboxId} role="listbox" aria-label="Insert a block">
            {slashMenu.commands.map((command, index) => (
              <button
                key={command.id}
                id={`${listboxId}-${command.id}`}
                type="button"
                role="option"
                aria-selected={index === slashMenu.selectedIndex}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  command.run(editor, { from: slashMenu.from, to: slashMenu.to });
                  setSlashMenu(null);
                }}
              >
                <span>{command.title}</span>
                <small>{command.description}</small>
              </button>
            ))}
          </div>
          {!slashMenu.commands.length && (
            <p className="tiptap-slash-empty" role="status">
              No matching blocks
            </p>
          )}
          <div className="tiptap-slash-hint">↑ ↓ to move · Enter to insert · Esc to close</div>
        </div>
      )}
    </div>
  );
}
