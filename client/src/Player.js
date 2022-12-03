import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, setPlayingTrack }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        !state.isPlaying && setPlay(false);
        state.isPlaying &&
          setPlayingTrack({
            title: state.track.name,
            artist: state.track.artists[0].name,
          });
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      name="Spotify Karaoke Web Player"
      //   magnifySliderOnHover
    />
  );
}
