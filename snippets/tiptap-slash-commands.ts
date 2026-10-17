import { Extension } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

export interface SlashCommand {
  id: string;
  title: string;
  description: string;
  keywords: string;
  run: (editor: Editor, range: { from: number; to: number }) => void;
}

export const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "text",
    title: "Text",
    description: "Just start writing",
    keywords: "paragraph plain",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    id: "heading-1",
    title: "Heading 1",
    description: "A large heading",
    keywords: "title h1",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    id: "heading-2",
    title: "Heading 2",
    description: "A medium heading",
    keywords: "subtitle h2",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    id: "heading-3",
    title: "Heading 3",
    description: "A small heading",
    keywords: "subtitle h3",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    id: "bullet-list",
    title: "Bullet list",
    description: "A simple collection",
    keywords: "unordered bullets",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    id: "numbered-list",
    title: "Numbered list",
    description: "One thing after another",
    keywords: "ordered numbers",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    id: "to-do",
    title: "To-do list",
    description: "Keep track of a few tasks",
    keywords: "task checkbox todo",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    id: "quote",
    title: "Quote",
    description: "Something worth keeping",
    keywords: "blockquote",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    id: "code",
    title: "Code block",
    description: "A place for your code",
    keywords: "snippet pre",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    id: "divider",
    title: "Divider",
    description: "A little breathing room",
    keywords: "horizontal rule line",
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

export interface SlashMenuState {
  from: number;
  to: number;
  query: string;
  selectedIndex: number;
  commands: SlashCommand[];
  left: number;
  top: number;
}

export function createSlashCommands(
  onChange: (state: SlashMenuState | null) => void,
  listboxId: string,
) {
  return Extension.create({
    name: "showcaseSlashCommands",
    priority: 1000,
    addProseMirrorPlugins() {
      const editor = this.editor;
      let current: SlashMenuState | null = null;
      let dismissed = "";
      let previousSignature = "";

      function notify(next: SlashMenuState | null) {
        current = next;
        const signature = JSON.stringify(next);
        if (signature === previousSignature) return;
        previousSignature = signature;
        onChange(next);
      }

      function update(view: EditorView) {
        view.dom.removeAttribute("aria-activedescendant");
        view.dom.setAttribute("aria-expanded", "false");
        const { selection } = view.state;
        const parent = selection.$from.parent;
        if (
          !view.hasFocus() ||
          !selection.empty ||
          parent.type.name !== "paragraph" ||
          view.composing
        ) {
          notify(null);
          return;
        }
        const before = parent.textBetween(0, selection.$from.parentOffset, "\n", "\ufffc");
        const match = /^\/([\w -]*)$/.exec(before);
        if (!match || parent.textContent !== before) {
          dismissed = "";
          notify(null);
          return;
        }
        const query = match[1] ?? "";
        const key = `${selection.from}:${query}`;
        if (dismissed === key) return;
        const commands = SLASH_COMMANDS.filter((command) =>
          `${command.title} ${command.keywords}`.toLowerCase().includes(query.toLowerCase()),
        );
        const coordinates = view.coordsAtPos(selection.from);
        const shell = view.dom.closest(".tiptap-example");
        const bounds = shell?.getBoundingClientRect();
        if (!bounds) {
          notify(null);
          return;
        }
        let selectedIndex = 0;
        if (current?.query === query && current.selectedIndex < commands.length)
          selectedIndex = current.selectedIndex;
        notify({
          from: selection.from - before.length,
          to: selection.from,
          query,
          commands,
          selectedIndex,
          left: Math.max(12, Math.min(coordinates.left - bounds.left, bounds.width - 272)),
          top: coordinates.bottom - bounds.top + 8,
        });
        view.dom.setAttribute("aria-controls", listboxId);
        view.dom.setAttribute("aria-expanded", "true");
        const selected = commands[selectedIndex];
        if (selected) view.dom.setAttribute("aria-activedescendant", `${listboxId}-${selected.id}`);
      }

      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              focus(view) {
                update(view);
                return false;
              },
              blur(view) {
                notify(null);
                view.dom.removeAttribute("aria-activedescendant");
                view.dom.setAttribute("aria-expanded", "false");
                return false;
              },
            },
            handleKeyDown(view, event) {
              if (!current || event.isComposing || view.composing) return false;
              if (event.key === "Escape") {
                dismissed = `${current.to}:${current.query}`;
                notify(null);
                view.dom.removeAttribute("aria-activedescendant");
                view.dom.setAttribute("aria-expanded", "false");
                return true;
              }
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                if (!current.commands.length) return true;
                const change = event.key === "ArrowDown" ? 1 : -1;
                const selectedIndex =
                  (current.selectedIndex + change + current.commands.length) %
                  current.commands.length;
                notify({ ...current, selectedIndex });
                const command = current?.commands[selectedIndex];
                if (command)
                  view.dom.setAttribute("aria-activedescendant", `${listboxId}-${command.id}`);
                return true;
              }
              if (event.key === "Enter") {
                const selected = current.commands[current.selectedIndex];
                if (!selected) return false;
                const range = { from: current.from, to: current.to };
                notify(null);
                selected.run(editor, range);
                return true;
              }
              return false;
            },
          },
          view(view) {
            update(view);
            return {
              update,
              destroy() {
                view.dom.removeAttribute("aria-controls");
                view.dom.removeAttribute("aria-expanded");
                view.dom.removeAttribute("aria-activedescendant");
              },
            };
          },
        }),
      ];
    },
  });
}
