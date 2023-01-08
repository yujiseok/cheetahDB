import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineSearch } from "react-icons/md";

const NavBar = () => {
  return (
    <StyledNav>
      <Container>
        <Logo>
          <Link to="/">Home</Link>
        </Logo>

        <RightWrapper>
          <SearchWrapper>
            <MdOutlineSearch />
            <SearchBar type="text" id="search" />
          </SearchWrapper>
          <Button usage="login" type="button">
            로그인
          </Button>
          <Button usage="signup" type="button">
            회원가입
          </Button>
        </RightWrapper>
      </Container>
    </StyledNav>
  );
};
export default NavBar;

const StyledNav = styled.nav`
  width: 100%;
  background-color: #fff;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid lightgray;
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
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid lightgray;
  background-color: lightgray;
  min-height: 30px;
  width: 250px;
`;

const Button = styled.button`
  border: ${({ usage }) => (usage === "signup" ? `1px solid #000` : null)};
  border-radius: 4px;
  color: ${({ usage }) => (usage === "signup" ? `#000` : "lightgray")};
  padding: 0.25rem 0.5rem;
  min-height: 30px;
`;
