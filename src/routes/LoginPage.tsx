import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [value, setValue] = useState("");

  const [passValue, setPassValue] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);

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
      <div id="container">
        <form action="" className="form">
          <h2>Zaloguj się</h2>
          
          <input type="text" id="nameoremail" name="nameoremail" placeholder="Nazwa lub Email"/> <br/>
          
          <div className="passwordBox">
                <input type={showPass ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Hasło"
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
                />
                <span
                  className="showToggle"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  >
                  <img src={showPass ? "/src/assets/eye_closed.svg" : "/src/assets/eye.svg"} 
                  alt={showPass ? "Ukryj" : "Pokaż"}  />
                </span> <br/>
          </div>
        <button
          onClick={() => {
            navigate("panel");
          }}
        >
        Zaloguj się
        </button>
        <div>{value}</div>
        </form>
        </div>
        <br/>
        <span className="nav"
          onClick={() => {
            navigate("register");
          }}
        >
          Nie posiadasz jeszcze konta? Utwórz je
        </span>
      
    </>
  );
}
