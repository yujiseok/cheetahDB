import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import NavBar from "./Nav";

const Layout = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  return (
    <>
      <NavBar />
      <Main path={path}>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
export default Layout;

const Main = styled.main`
  padding: ${({ path }) => (path === "movie" ? "0" : "3rem 0")};
`;
