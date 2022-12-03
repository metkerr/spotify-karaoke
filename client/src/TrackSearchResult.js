import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  //   console.log(track);
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div style={{ cursor: "pointer" }} onClick={handlePlay}>
      <img
        src={track.albumCover}
        alt={track.title}
        style={{ height: "64px", width: "64px" }}
      />
      <div>
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  );
}
