import moment from "moment";
import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Leaderboard from "@mui/icons-material/Leaderboard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationButton from "../../components/buttons/navigation";
import Loader from "../../components/loader";
import Page from "../../components/page";
import ErrorText from "../../components/texts/error";
import InfoText from "../../components/texts/info";
import TitleText from "../../components/texts/title";
import WarningText from "../../components/texts/warning";
import { getFilmListService, logoutService } from "../../service";
import { useAuthStore } from "../../store";
import { theme } from "../../theme";
import styles from "./styles";
import {
  FilmLanguage,
  FilmListScreenProps,
  Films,
  FilmsBackend,
} from "./types";

const FilmListScreen = (props: FilmListScreenProps) => {
  const [films, setFilms] = React.useState<Films>([]);
  const [isFetchingFilms, setIsFetchingFilms] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [filmLanguage, setFilmLanguage] = React.useState<FilmLanguage>(
    FilmLanguage.ALL
  );

  const filmColumns = 3;

  const setToken = useAuthStore((state) => state.storeToken);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutService();
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const displayedFilms =
    filmLanguage === FilmLanguage.ALL
      ? films
      : films.filter((film) => film.originalLanguage === "fr");

  const selectFilmLanguage = (
    event: React.MouseEvent<HTMLElement>,
    filmLanguage: FilmLanguage
  ) => {
    if (filmLanguage !== null) {
      setFilmLanguage(filmLanguage);
    }
  };

  const filmListAdapter: (filmList: FilmsBackend) => Films = (filmList) => {
    let adaptedFilms = [] as Films;
    if (!filmList) {
      return adaptedFilms;
    }
    adaptedFilms = filmList.map((film) => ({
      id: film.id,
      originalLanguage: film.original_language,
      overview: film.overview,
      popularity: film.popularity,
      posterPath: film.poster_path,
      releaseDate: moment(film.release_date).format("YYYY"),
      title: film.title,
    }));
    return adaptedFilms;
  };

  const getFilmList = React.useCallback(async () => {
    try {
      setError(false);
      setIsFetchingFilms(true);
      const response = await getFilmListService();
      const filmsBackend = response.data.films.results;
      const filmsData = filmListAdapter(filmsBackend);
      setFilms(filmsData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsFetchingFilms(false);
    }
  }, []);

  React.useEffect(() => {
    getFilmList();
  }, [getFilmList]);

  return (
    <Page>
      <div style={styles.logoutNavigator}>
        <NavigationButton title="Se déconnecter" onClick={onLogout} />
      </div>
      <TitleText text="Films Populaires" />
      <ToggleButtonGroup
        exclusive
        onChange={selectFilmLanguage}
        value={filmLanguage}
        aria-label="film-filter"
        color="primary"
      >
        <ToggleButton
          size="large"
          color="secondary"
          value={FilmLanguage.ALL}
          aria-label={FilmLanguage.ALL}
        >
          Tous
        </ToggleButton>
        <ToggleButton
          size="large"
          color="secondary"
          value={FilmLanguage.FRENCH}
          aria-label={FilmLanguage.FRENCH}
        >
          Français
        </ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {displayedFilms?.length > 0 ? (
          <ImageList sx={styles.imageList} cols={filmColumns}>
            {displayedFilms.map((film) => (
              <Link
                key={film.id}
                to={`/comments/${film.id}`}
                style={styles.commentsLink}
              >
                <ImageListItem key={film.id} style={styles.imageListItem}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${film.posterPath}`}
                    style={styles.poster}
                    alt={film.title}
                    loading="lazy"
                  />
                  <div style={styles.infosContainer}>
                    <Typography
                      align="center"
                      variant="body1"
                      style={styles.title}
                    >
                      {`${film.title} (${film.releaseDate})`}
                    </Typography>
                    <div style={styles.popularityContainer}>
                      <Leaderboard color="secondary" />
                      <Typography
                        style={styles.popularity}
                        color={theme.blue}
                        variant="body1"
                      >
                        {film.popularity}
                      </Typography>
                    </div>
                    <InfoText text={film.overview} />
                  </div>
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        ) : isFetchingFilms ? (
          <Loader />
        ) : error ? (
          <ErrorText text="Une erreur est survenue. Veuillez réessayer ultérieurement." />
        ) : (
          <WarningText text="Aucun film en français disponible" />
        )}
      </div>
    </Page>
  );
};

export default FilmListScreen;
