import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { async } from "@firebase/util";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";

export default function EditProfileView() {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);

  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setCurrentState(2);
  }

  function handleUserNotRegistered(user) {
    navigate("/login");
  }

  function handleUserNoLoggedIn(user) {
    navigate("/login");
  }

  function handleOpenFilePicture() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  }

  if (currentState !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNoLoggedIn={handleUserNoLoggedIn}
      ></AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div className="min-h-screen">
        <h2 className="text-center mt-5 mb-4 text-2xl text-slate-400">
          Editar información del perfil
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div>
            <img
              className="mx-auto rounded-full w-6/12"
              src={profileUrl}
              alt=""
            />
          </div>
          <div>
            <button
              className="bg-orange-200 p-2 rounded-xl hover:opacity-70 m-2 flex items-center justify-center"
              onClick={handleOpenFilePicture}
            >
              <span className="material-symbols-outlined text-black mr-2">
                archive
              </span>
              <span className="text-black text-base font-semibold">
                Subir nueva foto de perfil
              </span>
            </button>
            <input
              type="file"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
