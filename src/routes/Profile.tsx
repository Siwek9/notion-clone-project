import "../style/Profile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("Marek Marucha");
    const [email, setEmail] = useState("marek@mail.com");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return (
        <div className="profileContainer">
            <div className="profileLeftPart">
                <img src="/src/assets/profile.jpg" alt="zdjęcie profilowe" />
                <button
                    className="notePanelBox"
                    onClick={() => {
                        navigate("/panel");
                    }}
                >
                    Notatki
                </button>
                <button
                    className="notePanelBox"
                    onClick={() => {
                        if (editMode) {
                            // zapis informacji do bazy
                        }
                        setEditMode(!editMode);
                    }}
                >
                    {editMode ? "Zapisz informacje" : "Edytuj informacje"}
                </button>
                <button
                    className="notePanelBox"
                    onClick={() => {
                        const session_id = localStorage.getItem("session_id");
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
                    Wyloguj
                </button>
            </div>
            <div className="profileRightPart">
                <h1>Ustawienia profilu</h1>
                {!editMode ? (
                    <span>{name}</span>
                ) : (
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <br />
                {!editMode ? (
                    <span>{email}</span>
                ) : (
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder={email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <br />
                {!editMode ? (
                    <span></span>
                ) : (
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder={description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                )}
                <br />
                <button
                    onClick={() => {
                        document.querySelector("dialog")!.showModal();
                    }}
                >
                    Open Dialog
                </button>
                <dialog>
                    <p>Śmieszne rzeczy</p>
                    <form method="dialog">
                        <button>OK</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
}
