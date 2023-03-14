import { logout } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";

export default function SingOutView() {

    const navigate = useNavigate();
    async function handleUserLoggedIn(user) {   
         await logout()
      }

    function handleUserNotRegistered(user) {
        navigate("/login");
      }
    
      function handleUserNoLoggedIn() {
        navigate("/login");
      }

    return <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNoLoggedIn={handleUserNoLoggedIn}
  ></AuthProvider>
}