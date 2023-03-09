import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function EditProfileView() {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);

  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
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
    
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNoLoggedIn={handleUserNoLoggedIn}
    >
      <DashboardWrapper>
        <div>
          <h2>Editar información del perfil</h2>
          <div>
            <div>
              <img src={profileUrl} alt="" width={100} />
            </div>
            <div>
              <button onClick={handleOpenFilePicture}>Elegir nueva foto</button>
              <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleChangeFile}/>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </AuthProvider>
  );
}
