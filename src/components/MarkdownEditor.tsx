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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function MarkdownEditor({ children }: { children: string }) {
    return (
        <MDXEditor
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
