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

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: track.title,
          artist: track.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }

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
      <div className="flex-none w-96 flex-shrink px-7 py-3 max-h-screen">
        <input
          type="search"
          placeholder="What do you want to listen to?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black px-3 py-2 rounded placeholder:italic placeholder:text-slate-400 placeholder: text-xs w-full"
        />
        <div className="overflow-y-auto h-5/6 py-3 my-4">
          {searchResult.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 w-72 ml-2 flex flex-col max-h-screen">
        <div
          style={{ whiteSpace: "pre" }}
          className="mx-5 my-3 overflow-y-auto flex-grow pb-12"
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
