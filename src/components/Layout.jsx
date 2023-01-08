import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Nav";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main style={{ height: 4000 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
