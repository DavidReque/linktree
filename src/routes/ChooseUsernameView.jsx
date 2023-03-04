import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { existsUsername } from "../firebase/firebase";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState('')

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
    setUsername(e.target.value)
  }

  async function handleContinue() {
    if (username !== '') {
        const exits = await existsUsername(username)
        if (exits) {
            setCurrentState(5)
        } else {
            const tmp = {...currentUser}
            tmp.processCompleted = true
            
        }
    }
  }

  if (currentState === 3) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>

        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>

        <div>
            <button onClick={handleContinue}>
                Continuar
            </button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNoLoggedIn={handleUserNoLoggedIn}
    ></AuthProvider>
  );
}
