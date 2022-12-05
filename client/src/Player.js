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
      syncExternalDevice
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
      styles={{
        bgColor: "rgb(15 23 42)",
        sliderTrackColor: "#1e293b",
        sliderColor: "#22c55e",
        trackNameColor: "rgb(241 245 249)",
        trackArtistColor: "rgb(148 163 184)",
        color: "rgb(209 213 219)",
      }}
    />
  );
}
