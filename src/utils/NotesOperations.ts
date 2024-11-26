import { Socket, io } from "socket.io-client";
import Note from "./Note";
import { ServerResponse } from "./ServerResponse";
import fetchToServer from "./FetchToServer";

let socket: Socket;

export default {
    startSocket(url: string) {
        socket = io(url);
    },
    onNoteChanged(onNoteChanged: (content: string) => void) {
        socket.on("note_content", onNoteChanged);
    },
    async ReadNote(noteID: string): Promise<[string, number]> {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) return ["", -1];
        const res = await fetch("http://127.0.0.1:8000/read-note", {
            method: "POST",
            body: JSON.stringify({
                session_id: session_id,
                note_id: noteID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const content: ServerResponse<{
            noteContent: string;
            ownership: number;
        }> = await res.json();

        if (!content.success) return ["", -1];

        const noteContent: string = content.data.noteContent;

        const currentNoteID = localStorage.getItem("current_note_id");
        if (currentNoteID != null) {
            socket.emit("close_note", {
                session_id: localStorage.getItem("session_id")!,
                note_id: currentNoteID,
            });
        }

        socket.emit("open_note", {
            session_id: localStorage.getItem("session_id")!,
            note_id: noteID,
        });

        localStorage.setItem("current_note_id", noteID);

        return [noteContent, content.data.ownership];
    },
    async ModifyNote(markdown: string) {
        const currentNoteID = localStorage.getItem("current_note_id");

        if (currentNoteID == null) return;

        socket.emit("edit_note", {
            session_id: localStorage.getItem("session_id")!,
            note_id: currentNoteID,
            note_content: markdown,
        });
    },
    async createNewNote(): Promise<string> {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) {
            return "";
        }
        const res = await fetch("http://127.0.0.1:8000/create-note", {
            method: "POST",
            body: JSON.stringify({
                session_id: session_id,
                note_title: "Nowa prosta notatka",
                note_content:
                    "# Nowa Prosta Notatka \n ## Stworzona przy pomocy prostego przycisku w panelu zarządzania prostymi notatkami w innowacyjnej aplikacji Seton",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const content: ServerResponse<{ noteID: string }> = await res.json();

        if (!content.success) return "";
        console.log();
        return content.data.noteID;
    },
    async getNotes(): Promise<Array<Note>> {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) return [];
        const response = await fetchToServer<{
            notes: Array<{
                id: string;
                title: string;
                create_time: string;
                modification_time: string;
                content: string;
            }>;
        }>("/get-notes", JSON.stringify({ session_id: session_id }));

        if (!response.success) return [];

        const notesArray = Array<Note>();

        response.data.notes.forEach((note) => {
            notesArray.push(
                new Note(
                    note.id,
                    note.title,
                    note.create_time,
                    note.modification_time,
                    note.content
                )
            );
        });
        return notesArray;
    },
};
