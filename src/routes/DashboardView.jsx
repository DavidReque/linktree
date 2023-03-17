import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  insertNewLink,
  getLinks,
  updateLink,
  deleteLink,
} from "../firebase/firebase";
import Link from "../components/Link";
import style from "./dashboardView.module.css";

export default function DashboardView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setCurrentState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
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
        Cargando...
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

  async function handleDeleteLink(docId) {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  }

  async function handleUpdateLink(docId, title, url) {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }

  return (
    <DashboardWrapper>
      <div className={style.altura}>
        <div>
          <h1 className="text-white text-center font-normal text-4xl mt-4">
            Escribe tus Links
          </h1>

          <form
            className={style.entryContainer}
            action=""
            onSubmit={handleOnSubmit}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="mx-4 my-1 text-2xl text-white" htmlFor="title">
                Titulo
              </label>
              <input
                className="m-4 p-3 focus:ring-2 focus:ring-black focus:outline-none appearance-none text-sm text-slate-900 placeholder-slate-800 rounded-md  shadow-sm flex-grow placeholder:text-slate-400"
                type="text"
                name="title"
                placeholder="Titilo"
                id=""
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label className="mx-4 my-1 text-white text-2xl" htmlFor="url">
                URL
              </label>
              <input
                className="m-4 p-3 focus:ring-2 focus:ring-black focus:outline-none appearance-none text-sm text-slate-900 placeholder-slate-800 rounded-md shadow-sm flex-grow placeholder:text-slate-400"
                type="text"
                name="url"
                placeholder="https://algo.com"
                id=""
                onChange={handleOnChange}
              />
            </div>

            <div className="flex justify-center md:justify-start">
              <input
                className="mx-auto block m-4 h-10 px-5 rounded-lg border-2 border-cyan-300 bg-cyan-300 font-medium hover:bg-transparent hover:text-white hover:border-2 hover:border-cyan-300"
                type="submit"
                value="Create new Link"
              />
            </div>
          </form>

          <div className="flex justify-center flex-col items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.docId}
                docId={link.docId}
                url={link.url}
                title={link.title}
                onDelete={handleDeleteLink}
                onUpdate={handleUpdateLink}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
