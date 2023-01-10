import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import MovieLists from "./pages/MovieLists";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:type" element={<MovieLists />} />
          <Route path="/movie/:movieId" element={<DetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
