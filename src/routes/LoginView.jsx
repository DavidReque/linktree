import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function LoginView() {
  const [currentUser, setCurrentUser] = useState(null);
  /*
        0:inicializado
        1:loading
        2:login completo
        3:login pero sin registro
        4:no hay nadie logueado
    */
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, handleUser);
  }, []);

  function handleUser(user) {
    if (user) {
      setCurrentState(3);
      console.log(user.displayName);
    } else {
      setCurrentState(4);
      console.log("No hay nadie");
    }
  }

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

  if (currentState === 3) {
    <div>Estas autenticado pero no registrado</div>;
  }

  if (currentState === 4) {
    return (
      <div>
        <button onClick={handleOnclick}>Login With Google</button>
      </div>
    );
  }

  return <div>Loading ...</div>;
}
