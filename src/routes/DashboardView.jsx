import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { insertNewLink } from "../firebase/firebase";

export default function DashboardView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

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
      >
        Cargando
      </AuthProvider>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  async function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = await insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>

        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" id="" onChange={handleOnChange} />

          <label htmlFor="url">URL</label>
          <input type="text" name="url" id="" onChange={handleOnChange} />

          <input type="submit" value="Create new Link" />
        </form>

        <div>
          {links.map((link) => (
            <div key={link.id}>
              <a href={link.url}>{link.title}</a>
            </div>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
