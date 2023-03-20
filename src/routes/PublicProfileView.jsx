import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserProfileInfo,
} from "../firebase/firebase";
import { PublicLink } from "../components/PublicLink";

export default function PublicProfileView() {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;

      try {
        const userExists = await existsUsername(username);

        if (userExists) {
          const userInfo = await getUserProfileInfo(userExists);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setCurrentState(7);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [params]);

  if (currentState === 7) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <h1 className="text-red-500 text-4xl">El usuario no existe 😢</h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <img className="mx-auto mt-10 rounded-full w-52" src={url} alt="" />
      </div>
      <div className="m-2 flex items-center justify-center flex-col">
        <h2 className="text-center mt-5 mb-4 text-4xl text-slate-100">
          {profile?.profileInfo?.username}
        </h2>
        <h3 className="text-center mb-4 text-3xl text-slate-100">
          {profile?.profileInfo?.displayName}
        </h3>
        <div className="w-9/12">
          {profile?.linksInfo.map((link) => (
            <div className="bg-transparent border-2 border-white h-16 mt-3 mb-5 p-3 rounded-xl hover:bg-slate-100 hover:border-slate-100 hover:text-black">
            <PublicLink key={link.docId} url={link.url} title={link.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
