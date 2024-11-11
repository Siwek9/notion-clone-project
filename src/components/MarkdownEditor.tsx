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
    ButtonWithTooltip,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { RefObject } from "react";
import ShareButton from "./ShareButton";

export default function MarkdownEditor({
    markdownRef,
    shareDialogRef,
    onChange,
    children,
}: {
    markdownRef: RefObject<MDXEditorMethods>;
    shareDialogRef: RefObject<HTMLDialogElement>;
    onChange: (markdown: string) => void;
    children: string;
}) {
    return (
        <>
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
                                <ButtonWithTooltip title="Share with your friends">
                                    <ShareButton
                                        onClick={() => {
                                            shareDialogRef.current?.showModal();
                                        }}
                                    ></ShareButton>
                                </ButtonWithTooltip>
                            </>
                        ),
                    }),
                ]}
            />
        </>
    );
}
