import { useNavigate } from "react-router-dom";

export function Panel() {
    const navigate = useNavigate();
    return (
        <>
            300 gram mąki <br />
            2 szklanki mleka
            <br />
            2 jaja
            <br />
            1/2 tabliczki czekolady
            <br />
            3 banany
            <br />
            2 bułki
            <br />
            arbuz
            <br />
            bakłażan <br />
            WD - 40
            <button
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
                    // navigate("/");
                }}
            >
                Wyloguj się
            </button>
        </>
    );
}
