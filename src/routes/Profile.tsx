import "../style/Profile.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchToServer from "../utils/FetchToServer";
import Friend from "../utils/Friend";
import FriendRequest from "../utils/FriendRequests";

export function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [friendList, setFriendList] = useState<Array<Friend>>([]);
    const [friendRequestList, setFriendRequestList] = useState<
        Array<FriendRequest>
    >([]);

    const addFriendDialog = useRef<HTMLDialogElement>(null);
    const addFriendInput = useRef<HTMLInputElement>(null);

    function fetchUserData() {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) return;
        FetchToServer<{
            userData: {
                id: number;
                name: string;
                email: string;
                profile_picture: string;
                description: string;
            };
            friendRequests: Array<{
                name: string;
                profile_picture: string;
                request_id: string;
            }>;
            friends: Array<{
                name: string;
                profile_picture: string;
            }>;
        }>(
            "/get-profile-data",
            JSON.stringify({ session_id: session_id })
        ).then((response) => {
            if (!response.success) return;
            setName(response.data.userData.name);
            setEmail(response.data.userData.email);
            setDescription(response.data.userData.description);
            setFriendList(
                response.data.friends.map(
                    (friendData) =>
                        new Friend(friendData.name, friendData.profile_picture)
                )
            );
            setFriendRequestList(
                response.data.friendRequests.map(
                    (friendRequestData) =>
                        new FriendRequest(
                            friendRequestData.request_id,
                            friendRequestData.name,
                            friendRequestData.profile_picture
                        )
                )
            );
        });
    }

    useEffect(() => fetchUserData, []);

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
                        FetchToServer(
                            "/log-out",
                            JSON.stringify(formData)
                        ).then((response) => {
                            if (response.success) {
                                localStorage.removeItem("session_id");
                                localStorage.removeItem("current_note_id");
                                navigate("/");
                            }
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
                        placeholder="Podaj email"
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
                <div>
                    <h1>Znajomi ({friendList.length}):</h1>
                    {friendList.length == 0 ? (
                        <p>Twoja lista znajomych jest pusta</p>
                    ) : (
                        friendList?.map((friend) => (
                            <div key={friend.name}>{friend.name}</div>
                        ))
                    )}
                    <button
                        className="notePanelBox"
                        onClick={() => {
                            addFriendDialog.current?.showModal();
                            // document.querySelector("dialog")!.showModal();
                        }}
                    >
                        Dodaj znajomego
                    </button>
                    <dialog ref={addFriendDialog}>
                        <h1>
                            Podaj email/nazwę użytkownika, którego chcesz zaprosić
                            do znajomych:
                        </h1>
                        <input
                            ref={addFriendInput}
                            type="text"
                            placeholder="Nazwa użytkownika / email"
                        />
                        <button
                            className="notePanelBox"
                            onClick={() => {
                                if (addFriendInput.current == null) {
                                    addFriendDialog.current?.close();
                                    return;
                                }
                                const session_id =
                                    localStorage.getItem("session_id");
                                if (session_id == null) {
                                    addFriendDialog.current?.close();
                                    return;
                                }

                                const loginOrEmail = addFriendInput.current.value;

                                if (loginOrEmail != "") {
                                    FetchToServer(
                                        "/send-friend-request",
                                        JSON.stringify({
                                            session_id: session_id,
                                            loginOrEmail: loginOrEmail,
                                        })
                                    ).then((response) => {
                                        console.log(response);
                                    });
                                }
                                addFriendInput.current.value = "";
                                addFriendDialog.current?.close();
                            }}
                        >
                            OK
                        </button>
                    </dialog>
                </div>
                <div>
                    <h1 className="invites">Zaproszenia do znajomych ({friendRequestList.length}):</h1>
                    {friendRequestList.length == 0 ? (
                        <p>Nie masz jeszcze żadnych zaproszeń do znajomych</p>
                    ) : (
                        friendRequestList.map((friendRequest) => (
                            <div key={friendRequest.request_id}>
                                {friendRequest.name}
                                <button
                                    onClick={() => {
                                        const session_id =
                                            localStorage.getItem("session_id");
                                        if (session_id == null) {
                                            return;
                                        }

                                        FetchToServer(
                                            "/accept-friend-request",
                                            JSON.stringify({
                                                session_id: session_id,
                                                request_id:
                                                    friendRequest.request_id,
                                            })
                                        ).then((response) => {
                                            console.log(response);
                                            if (response.success) {
                                                fetchUserData();
                                            }
                                        });
                                    }}
                                >
                                    Tak
                                </button>
                                <button
                                    onClick={() => {
                                        const session_id =
                                            localStorage.getItem("session_id");
                                        if (session_id == null) {
                                            return;
                                        }

                                        FetchToServer(
                                            "/deny-friend-request",
                                            JSON.stringify({
                                                session_id: session_id,
                                                request_id:
                                                    friendRequest.request_id,
                                            })
                                        ).then((response) => {
                                            console.log(response);
                                            if (response.success) {
                                                fetchUserData();
                                            }
                                        });
                                    }}
                                >
                                    Nie
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
