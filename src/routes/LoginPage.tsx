import { useNavigate } from "react-router-dom"

export function LoginPage() {
    const navigate = useNavigate();
    return <>
        <form action="">
            Login: <input type="text" />
            Haslo: <input type="password" name="" id="" />
        </form>
        Nie masz jeszcze konta? Utwórz jedno
        <button onClick={() => { navigate("panel") }}>Zaloguj się</button>
    </>
}