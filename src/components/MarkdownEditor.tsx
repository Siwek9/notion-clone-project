import {
    listsPlugin,
    headingsPlugin,
    linkPlugin,
    MDXEditor,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    linkDialogPlugin,
    tablePlugin,
    markdownShortcutPlugin,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    InsertTable,
    ListsToggle,
    Separator,
    MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { RefObject } from "react";

export default function MarkdownEditor({
    markdownRef,
    onChange,
    children,
}: {
    markdownRef: RefObject<MDXEditorMethods>;
    onChange: (markdown: string) => void;
    children: string;
}) {
    return (
        <MDXEditor
            onChange={onChange}
            ref={markdownRef}
            markdown={children}
            contentEditableClassName="markdown"
            plugins={[
                headingsPlugin(),
                linkPlugin(),
                quotePlugin(),
                listsPlugin(),
                linkDialogPlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarClassName: "my-classname",
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <Separator />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <ListsToggle />
                            <InsertTable />
                            <CreateLink />
                            <CodeToggle />
                        </>
                    ),
                }),
            ]}
        />
    );
}
