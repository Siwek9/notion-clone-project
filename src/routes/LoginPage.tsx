import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/check-autorization", {
      method: "POST",
      body: JSON.stringify({ test: "example" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((content) => setValue(JSON.stringify(content)));
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <form action="">
        Login: <input type="text" />
        Haslo: <input type="password" name="" id="" />
      </form>
      Nie masz jeszcze konta? Utwórz jedno
      <button
        onClick={() => {
          navigate("panel");
        }}
      >
        Zaloguj się
      </button>
      <div>{value}</div>
    </>
  );
}
