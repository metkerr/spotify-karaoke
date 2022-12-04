import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  //   console.log(track);
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
      className="flex mb-3"
    >
      <img
        src={track.albumCover}
        alt={track.title}
        style={{ height: "64px", width: "64px" }}
      />
      <div className="px-3 text-ellipsis overflow-hidden whitespace-nowrap hover:text-green-500 my-auto">
        <div title={track.title} className="text-ellipsis overflow-hidden">
          {track.title}
        </div>
        <div className="text-ellipsis overflow-hidden" title={track.artist}>
          {track.artist}
        </div>
      </div>
    </div>
  );
}
