import { FormEvent, useState } from "react";
import "../App.css";

function AlbumPicker() {
  const [albums, setAlbums] = useState<string[]>([]);
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      artist: { value: string };
    };
    const artist = encodeURIComponent(target.artist.value);
    const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
    const response = await fetch(url);
    const mbResult = (await response.json()) as {
      releases: { title: string; date: string }[];
    };
    const { releases } = mbResult;
    setAlbums(releases.map(({ title }) => title));
    setReleaseDates(releases.map(({ date }) => date));
    console.log(mbResult);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Artist name:
        <input name="artist" />
      </label>
      <button className="my-search-button" type="submit">
        Search
      </button>
      <p>Albums:</p>
      <ol>
        {albums.map((album, index) => (
          <li key={index}>{`${album} - ${releaseDates[index]}`}</li>
        ))}
      </ol>
    </form>
  );
}

export default AlbumPicker;
