// import {
//     addActivePlugin$,
//     addExportVisitor$,
//     addImportVisitor$,
//     addLexicalNode$,
//     ALL_HEADING_LEVELS,
//     allowedHeadingLevels$,
//     HEADING_LEVEL,
//     realmPlugin,
// } from "@mdxeditor/editor";

// // Those params are passed to the init/update functions.
// export const headingsPlugin = realmPlugin<{
//     /**
//      * Allows you to limit the headings used in the editor. Affects the block type dropdown and the keyboard shortcuts.
//      * @default [1, 2, 3, 4, 5, 6]
//      */
//     allowedHeadingLevels?: ReadonlyArray<HEADING_LEVEL>;
// }>({
//     init(realm) {
//         // In here, we publish the necessary import/export visitors (omitted here, check the full source in github) into their respective signals.
//         // That's how the editor knows how to convert the MDAST Heading nodes into lexical nodes and vice versa.
//         // We're also registering the necessary Lexical node (HeadingNode) for the Lexical editor instance.
//         realm.pubIn({
//             [addActivePlugin$]: "headings",
//             [addImportVisitor$]: MdastHeadingVisitor,
//             [addLexicalNode$]: HeadingNode,
//             [addExportVisitor$]: LexicalHeadingVisitor,
//         });
//     },
//     update(realm, params) {
//         // The update function is called with each re-render.
//         // re-publishing into the allowedHeadingLevels$ cell means that you can change the allowed heading levels at any time (not just when the component mounts).
//         //
//         realm.pub(
//             allowedHeadingLevels$,
//             params?.allowedHeadingLevels ?? ALL_HEADING_LEVELS
//         );
//     },
// });
