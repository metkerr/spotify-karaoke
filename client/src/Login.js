import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d787b9a91de6426d9daba4662fc62525&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
}
