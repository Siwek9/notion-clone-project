import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";

import bigosRecipe from "../bigosRecipe";
import { useEffect, useState } from "react";
import Note from "../utils/Note";
import { NoteButton } from "../components/NoteButton";

export function Panel() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<Note>>();

    useEffect(() => {}, []);

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
                    Notatki:
                    <NoteButton name="Test1" id="1"></NoteButton>
                    <NoteButton name="pipotam" id="2"></NoteButton>
                </div>
                <div className="note">
                    <CustomScroll heightRelativeToParent="100%">
                        <MarkdownEditor>{bigosRecipe}</MarkdownEditor>
                    </CustomScroll>
                </div>
            </div>
        </div>
    );
}
