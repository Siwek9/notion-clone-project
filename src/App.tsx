import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LoginPage } from "./routes/LoginPage";
import { Panel } from "./routes/Panel";
import { Profile } from "./routes/Profile";
import { RegisterPage } from "./routes/RegisterPage";
import { useEffect } from "react";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const session_id = localStorage.getItem("session_id");
        if (session_id != null) {
            fetch("http://127.0.0.1:8000/check-session", {
                method: "POST",
                body: JSON.stringify({ session_id: session_id }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((content) => {
                    if (content["success"]) {
                        if (
                            location.pathname == "/" ||
                            location.pathname == "/register"
                        ) {
                            navigate("/panel");
                        }
                    } else {
                        localStorage.removeItem("session_id");
                        if (
                            location.pathname == "/panel" ||
                            location.pathname == "/register"
                        ) {
                            navigate("/");
                        }
                    }
                })
                .catch((reason) => {
                    console.log(reason);
                });
        }
    }, [location.pathname, navigate]);

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
