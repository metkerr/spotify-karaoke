import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "d787b9a91de6426d9daba4662fc62525",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics(track.lyric);
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
      //   console.log(res.body.tracks.items);
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
    <div style={{ height: "100vh" }}>
      <input
        type="search"
        placeholder="What do you want to listen to?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ overflowY: "auto" }}>
        {searchResult.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}

        {searchResult.length === 0 && (
          <div style={{ whiteSpace: "pre" }}>{lyrics}</div>
        )}
        {console.log(lyrics)}
      </div>
      <div>
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          setPlayingTrack={setPlayingTrack}
        />
      </div>
    </div>
  );
}
