import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
