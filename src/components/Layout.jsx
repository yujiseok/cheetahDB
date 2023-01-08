import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Nav";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
