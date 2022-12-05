import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import SpotifyLogo from "./images/logo512.png";

const spotifyApi = new SpotifyWebApi({
  clientId: "d787b9a91de6426d9daba4662fc62525",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    // setSearch("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResult(
        res.body.tracks.items.map((track) => {
          const smallestAlbumCover = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumCover: smallestAlbumCover.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-none border-r border-slate-800 w-96 flex-shrink pl-7 pr-3 py-3 max-h-screen">
        <div className="flex my-5 mx-2">
          <img
            src={SpotifyLogo}
            className="basis-5 w-9 h-9 m-auto"
            alt="spotify-logo"
          />
          <h1 className="flex-grow m-auto pl-2 text-2xl font-bold">
            <span className="text-green-500">Spotify</span>&nbsp;Karaoke
          </h1>
        </div>
        <input
          type="search"
          placeholder="What do you want to listen to?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black px-3 py-2 rounded-sm placeholder:italic placeholder:text-slate-400 placeholder: text-xs w-full"
        />
        <div className="overflow-y-auto py-3 my-4" style={{ height: "87%" }}>
          {searchResult.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 w-72 flex flex-col max-h-screen">
        <div
          style={{ whiteSpace: "pre-wrap" }}
          className="my-7 px-2 overflow-y-auto text-center flex-grow pb-8"
        >
          {lyrics ? (
            lyrics
          ) : (
            <div className="text-center pt-56">
              <img
                src={SpotifyLogo}
                className="w-14 mx-auto"
                alt="spotify-logo"
              />
              <h1 className="pt-4 text-2xl font-bold">Spotify Karaoke</h1>
            </div>
          )}
        </div>
        <div className="flex-none">
          <Player
            accessToken={accessToken}
            trackUri={playingTrack?.uri}
            setPlayingTrack={setPlayingTrack}
          />
        </div>
      </div>
    </div>
  );
}
