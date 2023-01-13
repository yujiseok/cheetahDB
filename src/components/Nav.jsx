import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalPortal from "./Modal/ModalPortal";
import Modal from "./Modal/Modal";
import useToggle from "../hooks/useToggle";
import useLocalStorage from "../hooks/useLocalStorage";

const NavBar = () => {
  const [toggle, setToggle] = useToggle();
  const [auth, setAuth] = useLocalStorage("auth", false);
  const [session, setSession] = useLocalStorage("session", null);
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuth(false);
    }, 1000 * 60 * 60);
    return () => {
      clearTimeout(timer);
    };
  }, [auth]);

  const logout = () => {
    setAuth(false);
    setSession(null);
    setUserId("");
    navigate("/");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const listener = () => {
    if (window.scrollY > 300) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <StyledNav path={path} show={show}>
      <Container>
        <Logo>
          <Link to="/">CheetahDB</Link>
        </Logo>

        <RightWrapper>
          <SearchWrapper>
            <MdOutlineSearch />
            <SearchBar
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleChange}
            />
          </SearchWrapper>
          {auth && session ? (
            <>
              <StyledLink to="/account">
                <MdOutlineAccountCircle />
              </StyledLink>
              <Button type="button" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button type="button" onClick={setToggle}>
              로그인
            </Button>
          )}
          <AnimatePresence>
            {toggle ? (
              <ModalPortal>
                <Modal
                  setToggle={setToggle}
                  auth={auth}
                  setAuth={setAuth}
                  setSession={setSession}
                  setUserId={setUserId}
                />
              </ModalPortal>
            ) : null}
          </AnimatePresence>
        </RightWrapper>
      </Container>
    </StyledNav>
  );
};
export default NavBar;

const StyledNav = styled.nav`
  width: 100%;
  background-color: ${({ path, show }) =>
    path === "movie" && !show ? "transparent" : "#fff"};
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: ${({ path, show }) =>
    path === "movie" && !show ? "none" : "1px solid #e5e5e5"};
  transition: all 0.3s;
`;

const Container = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fdd007;

  a {
    color: inherit;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
  }
`;

const SearchBar = styled.input`
  padding: 0.25rem 1.5rem;
  border: 1px solid #e5e5e5;
  background-color: #e5e5e5;
  min-height: 30px;
  width: 250px;
`;

const Button = styled.button`
  border: 1px solid #111;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  min-height: 30px;
`;

const StyledLink = styled(Link)`
  display: inline-block;

  svg {
    width: 28px;
    height: 28px;
  }
`;
