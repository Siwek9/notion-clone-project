import { useNavigate } from "react-router-dom";

export function Panel() {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <div className="leftPart">
                    <img src="/src/assets/seton.png" alt="logo" />
                </div>
                <div className="rightPart">
                    O profil |&nbsp;
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
                            // navigate("/");
                        }}
                    >
                        WYLOGUJ
                    </span>{" "}
                </div>
            </header>
            <div className="noteContainer">
                <div className="notesList">Notatki:</div>
                <div className="note">Notatka</div>
            </div>
        </>
    );
}
