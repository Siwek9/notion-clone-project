import { useNavigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import MarkdownEditor from "../components/MarkdownEditor";

import bigosRecipe from "../bigos-recipe";

// import FakeScroll from "@yaireo/fakescroll/react.fakescroll.js";
// import "@yaireo/fakescroll/fakescroll.css";

// const onFakeScrollChange = ({ scrollRatio }) => console.log(scrollRatio);

export function Panel() {
    const navigate = useNavigate();

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
                    </span>{" "}
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
                            // navigate("/");
                        }}
                    >
                        WYLOGUJ
                    </span>{" "}
                </div>
            </header>
            <div className="noteContainer">
                <div className="notesList">Notatki:</div>
                <div className="note">
                    <CustomScroll heightRelativeToParent="100%">
                        <MarkdownEditor>{bigosRecipe}</MarkdownEditor>
                    </CustomScroll>
                </div>
            </div>
        </div>
    );
}
