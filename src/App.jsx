import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import MovieLists from "./pages/MovieLists";
import Search from "./pages/Search";
import PrivateRoute from "./components/route/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/account/:type"
            element={
              <PrivateRoute>
                <MovieLists />
              </PrivateRoute>
            }
          />
          <Route path="/movie/:movieId" element={<DetailPage />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
