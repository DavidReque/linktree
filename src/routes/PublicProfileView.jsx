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
      <div>
        <h1>El usuario no existe</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img src={url} alt="" />
      </div>
      <h2>{profile?.profileInfo?.username}</h2>
      <h3>{profile?.profileInfo?.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.docId} url={link.url} title={link.title}/>
        ))}
      </div>
    </div>
  );
}
