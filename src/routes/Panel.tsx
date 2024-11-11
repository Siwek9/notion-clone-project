import "../style/Panel.css";

import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Note from "../utils/Note";
import { NoteButton } from "../components/NoteButton";
import { MDXEditorMethods } from "@mdxeditor/editor";
import notesOperation from "../utils/NotesOperations";

export function Panel() {
    // const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<Note>>();
    const markdownRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        notesOperation.getNotes().then((notes) => setNotes(notes));
    }, []);

    useEffect(() => {
        notesOperation.startSocket("http://localhost:8000");

        notesOperation.onNoteChanged((content) => {
            markdownRef.current?.setMarkdown(content);
        });

        const currentNoteID = localStorage.getItem("current_note_id");
        if (currentNoteID == null) return;

        notesOperation.ReadNote(currentNoteID).then((noteContent) => {
            markdownRef.current?.setMarkdown(noteContent);
        });
    }, []);

    return (
        <div className="panel">
            <div className="leftPart">
                <img src="/src/assets/seton.png" alt="logo" />
                <div className="notesList">
                    <CustomScroll heightRelativeToParent="100%">
                        <span>Notatki</span>
                        {notes?.map((note) => (
                            <NoteButton
                                onNoteChanged={(noteContent) => {
                                    markdownRef.current?.setMarkdown(
                                        noteContent
                                    );
                                }}
                                key={note.id}
                                name={note.title}
                                id={note.id}
                            ></NoteButton>
                        ))}
                        <button
                            className="addButton"
                            onClick={async () => {
                                const nodeID =
                                    await notesOperation.createNewNote();
                                const notes = await notesOperation.getNotes();
                                setNotes(notes);
                                const noteContent =
                                    await notesOperation.ReadNote(nodeID);
                                markdownRef.current?.setMarkdown(noteContent);
                            }}
                        >
                            Dodaj nową notatkę
                        </button>
                    </CustomScroll>
                </div>
            </div>
            <div className="rightPart">
                <header>
                    <span
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        <img src="/src/assets/profile.jpg" alt="logo" />
                        &nbsp;PROFIL
                    </span>
                    |&nbsp;
                    <span
                        onClick={() => {
                            const session_id =
                                localStorage.getItem("session_id");
                            if (session_id == null) {
                                navigate("/");
                                return;
                            }

                            const formData = {
                                session_id: session_id,
                            };
                            fetch("http://127.0.0.1:8000/log-out", {
                                method: "POST",
                                body: JSON.stringify(formData),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((res) => res.json())
                                .then(() => {
                                    localStorage.removeItem("session_id");
                                    localStorage.removeItem("current_note_id");
                                    navigate("/");
                                });
                        }}
                    >
                        WYLOGUJ
                    </span>
                </header>

                <div className="note">
                    <CustomScroll heightRelativeToParent="100%">
                        <MarkdownEditor
                            onChange={notesOperation.ModifyNote}
                            markdownRef={markdownRef}
                        >
                            {" "}
                        </MarkdownEditor>
                    </CustomScroll>
                </div>
            </div>
        </div>
    );
}
