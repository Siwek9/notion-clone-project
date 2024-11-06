import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";
import { useRef } from "react";

import { useEffect, useState } from "react";
import Note from "../utils/Note";
import { NoteButton } from "../components/NoteButton";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Socket, io } from "socket.io-client";

export function Panel() {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<Note>>();
    const markdownRef = useRef<MDXEditorMethods>(null);
    const [currentNoteID, setCurrentNoteID] = useState<string | null>(null);
    // const [noteContent, setNoteContent] = useState("");

    function handleNotes(content: {
        success: boolean;
        data: { notes: Array<any> };
    }) {
        if (!content["success"]) return;

        const notesArray = Array<Note>();

        content["data"]["notes"].forEach((note: any) => {
            console.log("siema");
            notesArray.push(
                new Note(
                    note["id"],
                    note["title"],
                    note["create_time"],
                    note["modification_time"],
                    note["content"]
                )
            );
        });
        setNotes(notesArray);
    }

    function getNotes() {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) return;
        fetch("http://127.0.0.1:8000/get-notes", {
            method: "POST",
            body: JSON.stringify({ session_id: session_id }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(handleNotes);
    }

    useEffect(getNotes, []);
    useEffect(() => {
        var socket = io("http://localhost:8000");
        setSocket(socket);
        socket.on("note_content", (note_content: string) => {
            markdownRef.current?.setMarkdown(note_content);
        });
    }, []);

    return (
        <div className="panel">
            <header>
                <div className="leftPart">
                    <img src="/src/assets/seton.png" alt="logo" />
                </div>
                <div className="rightPart">
                    <span
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        <img src="/src/assets/profile.jpg" alt="logo" />&nbsp;PROFIL
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
                                    navigate("/");
                                });
                        }}
                    >
                        WYLOGUJ
                    </span>
                </div>
            </header>
            <div className="noteContainer">
                <div className="notesList">
                    <CustomScroll heightRelativeToParent="100%">
                        <span>Notatki</span>
                        {notes?.map((note) => (
                            <NoteButton
                                onNoteChanged={async (noteContent) => {
                                    markdownRef.current?.setMarkdown(
                                        noteContent
                                    );
                                    if (socket != undefined) {
                                        socket.emit("close_note", {
                                            session_id:
                                                localStorage.getItem(
                                                    "session_id"
                                                )!,
                                            note_id: note.id,
                                        });
                                        socket.emit("open_note", {
                                            session_id:
                                                localStorage.getItem(
                                                    "session_id"
                                                )!,
                                            note_id: note.id,
                                        });

                                        setCurrentNoteID(note.id);
                                    }
                                }}
                                key={note.id}
                                name={note.title}
                                id={note.id}
                            ></NoteButton>
                        ))}
                        <button
                            className="addButton"
                            onClick={() => {
                                const session_id =
                                    localStorage.getItem("session_id");
                                if (session_id == null) {
                                    navigate("/");
                                    return;
                                }
                                fetch("http://127.0.0.1:8000/create-note", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        session_id: session_id,
                                        note_title: "Nowa notatka",
                                        note_content: "# Nowa Notatka",
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                    .then((res) => res.json())
                                    .then(getNotes);
                            }}
                        >
                            Dodaj nową notatkę
                        </button>
                    </CustomScroll>
                </div>
                <div className="note">
                    <CustomScroll heightRelativeToParent="100%">
                        <MarkdownEditor
                            onChange={(markdown) => {
                                console.log(socket);
                                if (socket == undefined) return;
                                console.log("siema312312");
                                socket.emit("edit_note", {
                                    session_id:
                                        localStorage.getItem("session_id")!,
                                    note_id: currentNoteID,
                                    note_content: markdown,
                                });
                            }}
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
