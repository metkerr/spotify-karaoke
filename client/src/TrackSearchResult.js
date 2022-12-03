import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  //   console.log(track);
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      className="d-flex m-2 align-item-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumCover}
        alt={track.title}
        style={{ height: "64px", width: "64px" }}
      />
      <div className="mx-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
