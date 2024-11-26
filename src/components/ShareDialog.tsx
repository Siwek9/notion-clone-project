import { RefObject, useEffect, useState } from "react";
import ShareMode from "../utils/ShareMode";
import "../style/ShareDialog.css";
import Friend from "../utils/Friend";
import FetchToServer from "../utils/FetchToServer";

export default function ShareDialog({
    shareDialogRef,
    onSharing,
}: {
    shareDialogRef: RefObject<HTMLDialogElement>;
    onSharing: (personName: string, shareMode: ShareMode) => void;
}) {
    const [friendList, setFriendList] = useState<Array<Friend> | null>(null);
    const [choosenFriend, setChoosenFriend] = useState<string | null>(null);
    const [canWriteStatus, setCanWriteStatus] = useState<ShareMode>(
        ShareMode.CanRead
    );

    useEffect(() => {
        const session_id = localStorage.getItem("session_id");
        if (session_id == null) return;
        FetchToServer<{
            friends: Array<{
                name: string;
                profile_picture: string;
            }>;
        }>("/get-friend-list", JSON.stringify({ session_id: session_id })).then(
            (response) => {
                if (response.success) {
                    const tempFriendList = response.data.friends.map(
                        (friend) =>
                            new Friend(friend.name, friend.profile_picture)
                    );
                    setFriendList(tempFriendList);
                    if (tempFriendList.length > 0) {
                        setChoosenFriend(tempFriendList[0].name);
                    }
                }
            }
        );
    }, []);

    return (
        <dialog ref={shareDialogRef}>
            {friendList != null && friendList.length > 0 ? (
                <>
                    <h1>Komu chcesz udostępnić tą notatkę?</h1>
                    <br />
                    <select
                        className="choose-friend"
                        defaultValue={
                            friendList != null && friendList.length > 0
                                ? friendList[0].name
                                : undefined
                        }
                        onChange={(value) => {
                            setChoosenFriend(value.target.value);
                        }}
                    >
                        {friendList?.map((friend, index) => (
                            <option key={index} value={friend.name}>
                                {friend.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <h2 className="share-title">Zezwól na edytowanie</h2>
                    <div className="allow-write-button">
                        <input
                            className="allow-write-input"
                            id="allow-write-yes"
                            type="radio"
                            name="allowWrite"
                            value="yes"
                            checked={canWriteStatus == ShareMode.CanWrite}
                            onChange={(event) => {
                                if (event.target.value == "yes") {
                                    setCanWriteStatus(ShareMode.CanWrite);
                                } else {
                                    setCanWriteStatus(ShareMode.CanRead);
                                }
                            }}
                        />
                        <label
                            className="allow-write-single-button"
                            htmlFor="allow-write-yes"
                        >
                            Yes
                        </label>
                        <input
                            className="allow-write-input"
                            id="allow-write-no"
                            type="radio"
                            name="allowWrite"
                            value="no"
                            checked={canWriteStatus == ShareMode.CanRead}
                            onChange={(event) => {
                                if (event.target.value == "yes") {
                                    setCanWriteStatus(ShareMode.CanWrite);
                                } else {
                                    setCanWriteStatus(ShareMode.CanRead);
                                }
                            }}
                        />
                        <label
                            className="allow-write-single-button"
                            htmlFor="allow-write-no"
                        >
                            No
                        </label>
                    </div>
                    <br />
                    <button
                        className="share-button"
                        onClick={() => {
                            if (choosenFriend != null) {
                                onSharing(choosenFriend, canWriteStatus);
                            }
                            shareDialogRef.current?.close();
                        }}
                    >
                        Udostępnij
                    </button>
                </>
            ) : (
                <>
                    <h1>
                        Musisz najpierw dodać znajomych, aby móc im udostępniać
                        notatkę.
                    </h1>
                    <button
                        className="share-button"
                        onClick={() => {
                            shareDialogRef.current?.close();
                        }}
                    >
                        Zamknij
                    </button>
                </>
            )}
        </dialog>
    );
}
