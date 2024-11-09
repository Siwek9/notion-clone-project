import "../style/Profile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("Marek Marucha");
    const [email, setEmail] = useState("marek@mail.com");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="profileContainer">
            <div id="leftPart">
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
            <div id="middlePart">
                <h1>Ustawienia profilu</h1>
                <p className="inputLabel">Nazwa</p>
                {!editMode ? (
                    <span className="lockedInput">{name}</span>
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
                <p className="inputLabel">Email</p>
                {!editMode ? (
                    <span className="lockedInput">{email}</span>
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
                    <>
                        <p className="inputLabel">Hasło</p>
                        <div className="profilePasswordBox">
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="profileShowToggle"
                                onClick={() => {
                                    setShowPass(!showPass);
                                }}
                            >
                                <img
                                    src={
                                        showPass
                                            ? "/src/assets/eye_closed.svg"
                                            : "/src/assets/eye.svg"
                                    }
                                    alt={showPass ? "Ukryj" : "Pokaż"}
                                />
                            </span>
                        </div>
                        <p className="inputLabel">Opis</p>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder={description}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                )}
            </div>
            <div id="rightPart">
                <h1>Znajomi:</h1>
                <button
                    className="notePanelBox"
                    onClick={() => {
                        document.querySelector("dialog")!.showModal();
                    }}
                >
                    Dodaj znajomego
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
