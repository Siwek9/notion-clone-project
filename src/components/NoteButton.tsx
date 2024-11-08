import NotesOperations from "../utils/NotesOperations";

export function NoteButton({
    onNoteChanged,
    name,
    id,
}: {
    onNoteChanged: (noteContent: string) => void;
    name: string;
    id: string;
}) {
    return (
        <>
            <div
                className="noteBox"
                onClick={async () => {
                    const content = await NotesOperations.ReadNote(id);
                    onNoteChanged(content);
                }}
            >
                {name}
            </div>
        </>
    );
}
