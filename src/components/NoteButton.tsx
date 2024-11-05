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
            <button
                className="noteBox"
                onClick={() => {
                    console.log(id + " " + name);
                    const session_id = localStorage.getItem("session_id");
                    if (session_id == null) return;
                    fetch("http://127.0.0.1:8000/read-note", {
                        method: "POST",
                        body: JSON.stringify({
                            session_id: session_id,
                            note_id: id,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((content) => {
                            if (!content["success"]) return;
                            const noteContent: string =
                                content["data"]["noteContent"];
                            onNoteChanged(noteContent);
                        });
                }}
            >
                {name}
            </button>
        </>
    );
}
