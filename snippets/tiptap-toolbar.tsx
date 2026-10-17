import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { TiptapVariant } from "./tiptap-content.ts";
import { DemoIcon } from "./demo-icons.tsx";

interface ToolbarState {
  block: string;
  bold: boolean;
  italic: boolean;
  code: boolean;
  tasks: boolean;
  table: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

const INITIAL_STATE: ToolbarState = {
  block: "heading-1",
  bold: false,
  italic: false,
  code: false,
  tasks: false,
  table: false,
  canUndo: false,
  canRedo: false,
};

function getBlock(editor: Editor) {
  for (const level of [1, 2, 3]) {
    if (editor.isActive("heading", { level })) return `heading-${level}`;
  }
  return "paragraph";
}

function setBlock(editor: Editor, value: string) {
  if (value === "heading-1") editor.chain().focus().setHeading({ level: 1 }).run();
  else if (value === "heading-2") editor.chain().focus().setHeading({ level: 2 }).run();
  else if (value === "heading-3") editor.chain().focus().setHeading({ level: 3 }).run();
  else editor.chain().focus().setParagraph().run();
}

function Toolbar({
  editor,
  state,
  variant,
}: {
  editor: Editor | null;
  state: ToolbarState;
  variant: TiptapVariant;
}) {
  return (
    <div className="tiptap-example-toolbar" role="group" aria-label="Text formatting">
      <div className="tiptap-block-select">
        <select
          className="demo-select"
          aria-label="Block type"
          value={state.block}
          disabled={!editor}
          onChange={(event) => {
            if (editor) setBlock(editor, event.target.value);
          }}
        >
          <option value="paragraph">Text</option>
          <option value="heading-1">Heading 1</option>
          <option value="heading-2">Heading 2</option>
          <option value="heading-3">Heading 3</option>
        </select>
        <DemoIcon name="chevron-down" />
      </div>
      <span className="tiptap-toolbar-separator" aria-hidden="true" />
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost demo-button-square"
        aria-label="Bold"
        aria-pressed={state.bold}
        disabled={!editor}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <DemoIcon name="bold" />
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost demo-button-square"
        aria-label="Italic"
        aria-pressed={state.italic}
        disabled={!editor}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <DemoIcon name="italic" />
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost demo-button-square"
        aria-label="Inline code"
        aria-pressed={state.code}
        disabled={!editor}
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <DemoIcon name="code" />
      </button>
      {variant === "tasks" && (
        <button
          type="button"
          className="demo-button demo-button-small demo-button-ghost"
          aria-label="To-do list"
          aria-pressed={state.tasks}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
        >
          To-do
        </button>
      )}
      <span className="tiptap-toolbar-spacer" />
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost demo-button-square"
        aria-label="Undo"
        disabled={!state.canUndo}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        <DemoIcon name="undo" />
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost demo-button-square"
        aria-label="Redo"
        disabled={!state.canRedo}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        <DemoIcon name="redo" />
      </button>
    </div>
  );
}

export function ReadonlyToolbar({ variant }: { variant: TiptapVariant }) {
  return (
    <>
      <Toolbar editor={null} state={INITIAL_STATE} variant={variant} />
      {variant === "tables" && <TableControls editor={null} active={false} />}
    </>
  );
}

function TableControls({ editor, active }: { editor: Editor | null; active: boolean }) {
  return (
    <div className="tiptap-table-controls" role="group" aria-label="Table controls">
      <button
        type="button"
        className="demo-button demo-button-small"
        disabled={!editor || active}
        onClick={() =>
          editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      >
        Insert table
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost"
        disabled={!active}
        onClick={() => editor?.chain().focus().addRowAfter().run()}
      >
        Add row
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost"
        disabled={!active}
        onClick={() => editor?.chain().focus().addColumnAfter().run()}
      >
        Add column
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost"
        disabled={!active}
        onClick={() => editor?.chain().focus().deleteRow().run()}
      >
        Delete row
      </button>
      <button
        type="button"
        className="demo-button demo-button-small demo-button-ghost"
        disabled={!active}
        onClick={() => editor?.chain().focus().deleteTable().run()}
      >
        Delete table
      </button>
    </div>
  );
}

export function EditorToolbar({ editor, variant }: { editor: Editor; variant: TiptapVariant }) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      block: getBlock(editor),
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      code: editor.isActive("code"),
      tasks: editor.isActive("taskList"),
      table: editor.isActive("table"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });
  return (
    <>
      <Toolbar editor={editor} state={state} variant={variant} />
      {variant === "tables" && <TableControls editor={editor} active={state.table} />}
      <BubbleMenu editor={editor} options={{ placement: "top", offset: 8 }}>
        <div className="tiptap-bubble-menu" role="group" aria-label="Selection formatting">
          <button
            type="button"
            className="demo-button demo-button-small demo-button-ghost demo-button-square"
            aria-label="Bold selection"
            aria-pressed={state.bold}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <DemoIcon name="bold" />
          </button>
          <button
            type="button"
            className="demo-button demo-button-small demo-button-ghost demo-button-square"
            aria-label="Italic selection"
            aria-pressed={state.italic}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <DemoIcon name="italic" />
          </button>
          <button
            type="button"
            className="demo-button demo-button-small demo-button-ghost demo-button-square"
            aria-label="Code selection"
            aria-pressed={state.code}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <DemoIcon name="code" />
          </button>
        </div>
      </BubbleMenu>
    </>
  );
}
