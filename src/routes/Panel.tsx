import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";

import bigosRecipe from "../../../notion-clone-project-server/app/utils/bigosRecipe";
import { useEffect, useState } from "react";

export function Panel() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Array<{ id: string; title: string }>>();

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
                    <h2>Notatki:</h2>
                    <button>Dodaj nową notatkę</button>
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
