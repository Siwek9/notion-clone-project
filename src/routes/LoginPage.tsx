import "../style/Form.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [loginOrEmail, setLoginOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorContent, setErrorContent] = useState("Wpisane dane są nieprawidłowe");
    const [showError, setErrorVisilibity] = useState(false);

    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div id="container">
                <form
                    className="form"
                    method="post"
                    action="/"
                    onSubmit={(event) => {
                        const formData = {
                            loginOrEmail: loginOrEmail,
                            password: password,
                        };

                        fetch("http://127.0.0.1:8000/log-in", {
                            method: "POST",
                            body: JSON.stringify(formData),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((res) => res.json())
                            .then((content) => {
                                if (content["success"]) {
                                    const session_id =
                                        content["data"]["session_id"];
                                    if (session_id == null) {
                                        navigate("/");
                                    } else {
                                        localStorage.setItem(
                                            "session_id",
                                            session_id
                                        );
                                        navigate("/panel");
                                    }
                                } else {
                                    console.log(content);
                                    console.log("nie zalogowalo cie pacanie");
                                    setErrorContent(errorContent);
                                    setErrorVisilibity(true);
                                }
                            });
                        event.preventDefault();
                    }}
                >
                    <h2>Zaloguj się</h2>
                    <input
                        type="text"
                        id="username"
                        name="loginOrEmail"
                        placeholder="Nazwa lub Email"
                        value={loginOrEmail}
                        onChange={(e) => setLoginOrEmail(e.target.value)}
                    />
                    <br />
                    <div className="passwordBox">
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="showToggle"
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
                        <br />
                    </div>            
                    <button>Zaloguj się</button>
                    {showError ? <div className="errorMessage">{errorContent}</div> : <></>}
                </form>
            </div>
            <br />
            <span
                className="nav"
                onClick={() => {
                    navigate("register");
                }}
            >
                Nie posiadasz jeszcze konta? Utwórz je
            </span>
            <img className="logo" src="/src/assets/seton.png" alt="logo" />
        </>
    );
}
