import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";

export default function DashboardView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
  }

  function handleUserNotRegistered(user) {
    navigate("/login");
  }

  function handleUserNoLoggedIn(user) {
    navigate("/login");
  }

  if (currentState === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNoLoggedIn={handleUserNoLoggedIn}
      >Cargando</AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
        <div>
            <h1>Dashboard</h1>

            <form action="">
                <label htmlFor="title">Titulo</label>
                <input type="text" name="title" id="" />

                <label htmlFor="url">URL</label>
                <input type="text" name="url" id="" />

                <input type="submit" value='Create new Link' name="" id="" />
            </form>
        </div>
    </DashboardWrapper>
  )
}
