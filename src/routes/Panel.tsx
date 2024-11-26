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
import FetchToServer from "../utils/FetchToServer";
import ShareDialog from "../components/ShareDialog";

export function Panel() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<Note>>();
    const [currentNoteID, setCurrentNoteID] = useState<string | null>(null);
    const [currentNoteOwnerShip, setCurrentNoteOwnerShip] =
        useState<number>(-1);
    const markdownRef = useRef<MDXEditorMethods>(null);

    const shareDialogRef = useRef<HTMLDialogElement>(null);

    let address: string;
    useEffect(() => {
        notesOperation.getNotes().then((notes) => setNotes(notes));
    }, []);

    useEffect(() => {
        address = window.location.origin.replace(":5173", ":8000");
        notesOperation.startSocket(address);

        notesOperation.onNoteChanged((content) => {
            markdownRef.current?.setMarkdown(content);
        });

        const currentNoteID = localStorage.getItem("current_note_id");
        if (currentNoteID == null) return;
        setCurrentNoteID(currentNoteID);

        notesOperation.ReadNote(currentNoteID).then((noteContent) => {
            markdownRef.current?.setMarkdown(noteContent[0]);
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
                                        noteContent[0]
                                    );
                                    setCurrentNoteOwnerShip(noteContent[1]);
                                    setCurrentNoteID(note.id);
                                }}
                                key={note.id}
                                name={note.title}
                                id={note.id}
                            ></NoteButton>
                        ))}
                        <div>
                            <button
                                className="addButton"
                                onClick={async () => {
                                    const noteID =
                                        await notesOperation.createNewNote();
                                    const notes =
                                        await notesOperation.getNotes();
                                    setNotes(notes);
                                    const noteContent =
                                        await notesOperation.ReadNote(noteID);
                                    console.log(noteID);
                                    localStorage.setItem(
                                        "current_note_id",
                                        noteID
                                    );
                                    setCurrentNoteID(noteID);
                                    setCurrentNoteOwnerShip(noteContent[1]);
                                    markdownRef.current?.setMarkdown(
                                        noteContent[0]
                                    );
                                }}
                            >
                                Dodaj nową prostą notatkę
                            </button>
                        </div>
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
                        &nbsp;PROFIL&nbsp;
                    </span>
                    &nbsp;&nbsp;&nbsp;
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
                            FetchToServer(
                                "/log-out",
                                JSON.stringify(formData)
                            ).then((response) => {
                                if (response.success) {
                                    localStorage.removeItem("session_id");
                                    localStorage.removeItem("current_note_id");
                                    navigate("/");
                                }
                            });
                        }}
                    >
                        WYLOGUJ
                    </span>
                </header>
                <div className="note">
                    <CustomScroll heightRelativeToParent="100%">
                        {currentNoteID == null ? (
                            <h1>Nie została wybrana żadna notatka</h1>
                        ) : (
                            <MarkdownEditor
                                onDelete={() => {
                                    const currentNoteID =
                                        localStorage.getItem("current_note_id");
                                    if (currentNoteID == null) return;
                                    const sessionID =
                                        localStorage.getItem("session_id");
                                    if (sessionID == null) return;

                                    FetchToServer(
                                        "/delete-note",
                                        JSON.stringify({
                                            session_id: sessionID,
                                            note_id: currentNoteID,
                                        })
                                    ).then((response) => {
                                        if (response.success) {
                                            notesOperation
                                                .getNotes()
                                                .then((notes) =>
                                                    setNotes(notes)
                                                );
                                            localStorage.removeItem(
                                                "current_note_id"
                                            );
                                            setCurrentNoteID(null);
                                            setCurrentNoteOwnerShip(-1);
                                        }
                                    });
                                }}
                                onChange={notesOperation.ModifyNote}
                                markdownRef={markdownRef}
                                shareDialogRef={shareDialogRef}
                                isOwner={currentNoteOwnerShip == 0}
                            >
                                {" "}
                            </MarkdownEditor>
                        )}
                    </CustomScroll>
                </div>
            </div>
            <ShareDialog
                onSharing={(personName, shareMode) => {
                    const session_id = localStorage.getItem("session_id");
                    if (session_id == null) return;
                    const currentNoteID =
                        localStorage.getItem("current_note_id");
                    if (currentNoteID == null) return;

                    FetchToServer(
                        "/share-note",
                        JSON.stringify({
                            session_id: session_id,
                            friend_name: personName,
                            note_id: currentNoteID,
                            share_mode: shareMode,
                        })
                    );
                }}
                shareDialogRef={shareDialogRef}
            />
        </div>
    );
}
