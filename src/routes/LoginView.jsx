import { useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import AuthProvider from "../components/AuthProvider";
import style from "./loginView.module.css";

export default function LoginView() {
  const navigate = useNavigate();
  //const [currentUser, setCurrentUser] = useState(null);
  /*
        0:inicializado
        1:loading
        2:login completo
        3:login pero sin registro
        4:no hay nadie logueado
        5:ya existe usename
        6:nuevo username, click para continuar
        7:username no existe
    */
  const [currentState, setCurrentState] = useState(0);

  async function handleOnclick() {
    const googleProvider = new GoogleAuthProvider();
    await singIn(googleProvider);

    async function singIn(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }

  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }

  function handleUserNoLoggedIn() {
    setCurrentState(4);
  }

  /*if (currentState === 2) {
    <div>Estas autenticado y registrado</div>;
  }

  if (currentState === 3) {
    <div>Estas autenticado pero no registrado</div>;
  }*/

  if (currentState === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1 className="font-normal text-4xl text-white">Link Tree</h1>
        </div>
        <button
          className="px-5 py-3 rounded-full border-2 border-cyan-600 bg-cyan-600 font-medium hover:bg-transparent hover:text-white hover:border-2 hover:border-cyan-600"
          onClick={handleOnclick}
        >
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNoLoggedIn={handleUserNoLoggedIn}
    >
      <div>Loading ...</div>
    </AuthProvider>
  );
}
