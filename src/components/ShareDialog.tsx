import { RefObject } from "react";
import ShareMode from "../utils/ShareMode";

export default function ShareDialog({
    shareDialogRef,
    onSharing,
}: {
    shareDialogRef: RefObject<HTMLDialogElement>;
    onSharing: (personName: string, shareMode: ShareMode) => void;
}) {
    return (
        <dialog ref={shareDialogRef}>
            <h1>Komu chcesz udostępnić tą notatkę?</h1>
            <br />
            <select>
                <option value="lol">lol</option>
            </select>
            <br />
            <input type="radio" name="allowWrite" value="yes" />
            <br />
            <input type="radio" name="allowWrite" value="no" checked />
            <br />
            <button onClick={() => onSharing("lool", ShareMode.CanRead)}>
                Udostępnij
            </button>
        </dialog>
    );
}
