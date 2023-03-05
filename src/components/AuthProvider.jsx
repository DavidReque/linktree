import { useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";

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
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            // redigir a Dashboard
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo)
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNoLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNoLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}
