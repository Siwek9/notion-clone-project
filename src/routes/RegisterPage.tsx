import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassR, setShowPassR] = useState(false);

    const navigate = useNavigate();
    return (
        <>
            <div id="container">
                <form
                    className="form"
                    action="/"
                    method="post"
                    onSubmit={(event) => {
                        const formData = {
                            login: login,
                            email: email,
                            password: password,
                            repeatPassword: passwordRepeat,
                        };

                        fetch("http://127.0.0.1:8000/register", {
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
                                        navigate("/profile");
                                    }
                                } else {
                                    console.log("nie zalogowalo cie pacanie");
                                }
                            });
                        event.preventDefault();
                    }}
                >
                    <h2>Zarejestruj się</h2>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nazwa"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <br />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div className="passwordBox">
                        <input
                            type={showPassR ? "text" : "password"}
                            id="passwordRepeat"
                            name="passwordRepeat"
                            placeholder="Powtórz Hasło"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                        <span
                            className="showToggle"
                            onClick={() => {
                                setShowPassR(!showPassR);
                            }}
                        >
                            <img
                                src={
                                    showPassR
                                        ? "/src/assets/eye_closed.svg"
                                        : "/src/assets/eye.svg"
                                }
                                alt={showPassR ? "Ukryj" : "Pokaż"}
                            />
                        </span>
                        <br />
                    </div>
                    <button type="submit">Zarejestruj się</button>
                </form>
            </div>
            <br />
            <span
                className="nav"
                onClick={() => {
                    navigate("/");
                }}
            >
                Już posiadasz konto? Zaloguj się
            </span>
            <img className="logo" src="/src/assets/seton.png" alt="logo" />
        </>
    );
}
