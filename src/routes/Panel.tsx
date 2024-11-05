import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";
import { useRef } from "react";

import { useEffect, useState } from "react";
import Note from "../utils/Note";
import { NoteButton } from "../components/NoteButton";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { io } from "socket.io-client";

export function Panel() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<Note>>();
    const markdownRef = useRef<MDXEditorMethods>(null);
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
        const socket = io("http://localhost:8000");
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
                        O profil
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
                        Notatki:
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
                        <MarkdownEditor markdownRef={markdownRef}>
                            {" "}
                        </MarkdownEditor>
                    </CustomScroll>
                </div>
            </div>
        </div>
    );
}
