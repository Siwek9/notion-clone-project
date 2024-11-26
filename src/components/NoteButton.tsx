import NotesOperations from "../utils/NotesOperations";

export function NoteButton({
    onNoteChanged,
    name,
    id,
}: {
    onNoteChanged: (noteContent: [string, number]) => void;
    name: string;
    id: string;
}) {
    return (
        <>
            <div
                className="noteBox"
                onClick={async () => {
                    const content = await NotesOperations.ReadNote(id);
                    localStorage.setItem("current_note_id", id);

                    onNoteChanged(content);
                }}
            >
                {name}
            </div>
        </>
    );
}
