import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => setGenres(response.data));
  }, []);

  useEffect(() => {
    api
      .get<Genre>(`genres/${selectedGenreId}`)
      .then((response) => setSelectedGenre(response.data));
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        onClickGenre={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} />
    </div>
  );
}
