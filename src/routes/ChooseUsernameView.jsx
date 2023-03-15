import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }

  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setCurrentState(3);
  }

  function handleUserNoLoggedIn(user) {
    navigate("/login");
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }

  async function handleContinue() {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setCurrentState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setCurrentState(6);
      }
    }
  }

  if (currentState === 3 || currentState === 5) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {currentState === 5 ? <p>El nombre de usuario ya existe</p> : ""}
        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>

        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (currentState === 6) {
    return <div>
      <h1 className="text-3xl font-bold underline">Felicidades, ya puedes crear tus links</h1>
      <Link to='/dashboard'>Continuar</Link>
    </div>
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNoLoggedIn={handleUserNoLoggedIn}
    ></AuthProvider>
  );
}
