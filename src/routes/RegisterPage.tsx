import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [value, setValue] = useState("");

  const [passValue, setPassValue] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [passValueR, setPassValueR] = useState<string>('');
  const [showPassR, setShowPassR] = useState<boolean>(false);

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
          <h2>Zarejestruj się</h2>
          
          <input type="text" id="username" name="username" placeholder="Nazwa"/> <br/>
          <input type="text" id="email" name="email" placeholder="Email"/> <br/>

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
          <div className="passwordBox">
                <input type={showPassR ? 'text' : 'password'}
                id="passwordRepeat"
                name="passwordRepeat"
                placeholder="Powtórz Hasło"
                value={passValueR}
                onChange={(e) => setPassValueR(e.target.value)}
                />
                <span
                  className="showToggle"
                  onClick={() => {
                    setShowPassR(!showPassR);
                  }}
                  >
                  <img src={showPassR ? "/src/assets/eye_closed.svg" : "/src/assets/eye.svg"} 
                  alt={showPassR ? "Ukryj" : "Pokaż"}  />
                </span> <br/>
          </div>
        <button
          onClick={() => {
            navigate("panel");
          }}
        >
        Zarejestruj się
        </button>
        <div>{value}</div>
        </form>
        </div>
        <br/>
        <span className="nav"
          onClick={() => {
            navigate("/");
          }}
        >
          Już posiadasz konto? Zaloguj się
        </span>
      
    </>
  );
}
