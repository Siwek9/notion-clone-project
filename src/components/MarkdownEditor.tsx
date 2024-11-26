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
import DeleteButton from "./DeleteButton";

export default function MarkdownEditor({
    markdownRef,
    shareDialogRef,
    onChange,
    onDelete,
    isOwner,
    children,
}: {
    markdownRef: RefObject<MDXEditorMethods>;
    shareDialogRef: RefObject<HTMLDialogElement>;
    onChange: (markdown: string) => void;
    onDelete: () => void;
    isOwner: boolean;
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
                                {isOwner ? (
                                    <ButtonWithTooltip title="Delete Note">
                                        <DeleteButton
                                            onClick={onDelete}
                                        ></DeleteButton>
                                    </ButtonWithTooltip>
                                ) : undefined}
                            </>
                        ),
                    }),
                ]}
            />
        </>
    );
}
