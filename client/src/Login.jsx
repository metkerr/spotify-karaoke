import React from "react";
import logo from "./images/logo512.png";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d787b9a91de6426d9daba4662fc62525&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="container mx-auto">
      <div className="text-center flex flex-col min-h-screen pt-40">
        <img src={logo} className="w-14 mx-auto" alt="spotify-logo" />
        <h1 className="pt-4 text-2xl font-bold">Spotify Karaoke</h1>
        <div id="cta-login-container" className="my-10">
          <a
            href={AUTH_URL}
            className="p-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded"
          >
            Login with Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
