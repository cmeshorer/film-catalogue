import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/login/component";
import FilmListScreen from "./screens/film-list/component";
import FilmCommentsScreen from "./screens/film-comments/component";
import { useAuthStore } from "./store";

function App() {
  const storedToken = localStorage.getItem("token");
  const setToken = useAuthStore((state) => state.storeToken);
  if (storedToken) setToken(storedToken);
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      {token ? (
        <Route>
          <Route path="/films" element={<FilmListScreen />} />
          <Route path="/comments/:id" element={<FilmCommentsScreen />} />
        </Route>
      ) : (
        <Route path="/" element={<LoginScreen />} />
      )}
    </Routes>
  );
}

export default App;
