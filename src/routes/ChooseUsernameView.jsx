import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";
import style from './chooseUsername.module.css'

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
      <div className={style.chooseUsername}>
        <h1 className="font-normal text-4xl text-white">Bienvenido {currentUser.displayName}</h1>
        <p className="text-2xl text-slate-400">Para terminar el proceso elige un nombre de usuario</p>
        {currentState === 5 ? <p>El nombre de usuario ya existe</p> : ""}
        <div>
          <input className="m-4 p-3 focus:ring-2 focus:ring-cyan-300 focus:outline-none appearance-none w-full sm:w-auto text-sm text-slate-900 placeholder-slate-800 rounded-md border-2 border-cyan-300 shadow-sm" type="text" onChange={handleInputUsername} />
        </div>

        <div>
          <button className="px-5 py-3 rounded-lg border-2 border-cyan-300 bg-cyan-300 font-medium hover:bg-transparent hover:text-white hover:border-2 hover:border-cyan-300" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (currentState === 6) {
    return <div className="h-screen flex justify-center flex-col items-center">
      <h1>Felicidades, ya puedes crear tus links</h1>
      <Link className="my-3 py-2 h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-slate-600" to='/dashboard'>Continuar</Link>
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
