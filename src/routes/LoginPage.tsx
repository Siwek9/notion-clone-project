import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [loginOrEmail, setLoginOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/register", {
    //         method: "POST",
    //         body: JSON.stringify({ test: "example" }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((content) => setValue(JSON.stringify(content)));
    // }, []);

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
                                    navigate("/panel");
                                } else {
                                    console.log("nie zalogowalo cie pacanie");
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
                </form>
            </div>
            <br />
            <button
                onClick={() => {
                    navigate("register");
                }}
            >
                Nie posiadasz jeszcze konta? Utwórz je
            </button>
        </>
    );
}
