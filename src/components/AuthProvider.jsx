import { useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNoLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //TODO: redigir a Dashboard
          onUserLoggedIn(user);
        } else {
          //TODO: Redigir a choose username
          onUserNotRegistered(user);
        }
      } else {
        onUserNoLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNoLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}
