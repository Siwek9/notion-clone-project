import { useNavigate } from "react-router-dom";

export function Panel() {
    const navigate = useNavigate();
    return <>
        300 gram mąki <br />
        2 szklanki mleka<br />
        2 jaja<br />
        1/2 tabliczki czekolady<br />
        3 banany<br />
        2 bułki<br />
        arbuz<br />
        bakłażan <br />
        WD - 40
        <button onClick={() => { navigate("/") }}>Wyloguj się</button>
    </>
}