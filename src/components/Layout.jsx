import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import NavBar from "./Nav";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
export default Layout;

const Main = styled.main`
  padding: 3rem 0;
`;
