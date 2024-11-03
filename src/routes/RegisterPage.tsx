// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  // const [value, setValue] = useState("");

  // const [passValue, setPassValue] = useState<string>('');
  // const [showPass, setShowPass] = useState<boolean>(false);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/check-autorization", {
  //     method: "POST",
  //     body: JSON.stringify({ test: "example" }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((content) => setValue(JSON.stringify(content)));
  // }, []);

  const navigate = useNavigate();
  return (
    <>
      Jak będzie gotowy login page to będzie tu zaaktualizowana jego wersja na logowanie <br/>
      <button
          onClick={() => {
            navigate("/");
          }}
        >
          Powrót
        </button>
    </>
  );
}
