import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../api/api";
import { mobile, tablet } from "../global/responsive";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

const UserMovieList = ({ title, type }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const sessionId = JSON.parse(localStorage.getItem("session"));
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const res = await instance.get(
          `/account/${userId}/${type}/movies?&session_id=${sessionId}&sort_by=created_at.desc&page=1`,
        );
        if (res.status === 200) {
          setMovieList(res.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovieList();
  }, []);

  return (
    <div>
      <TitleWrapper>
        <TitleLeft>
          <Title>{title}</Title> <span>{movieList.length}</span>
        </TitleLeft>
        <div>
          <StyledLink to={`/account/${type}`}>더보기</StyledLink>
        </div>
      </TitleWrapper>
      <MovieList length={movieList.length}>
        {movieList.slice(0, 5).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
        {movieList.length > 0 ? (
          <MoreWrapper>
            <Link to={`/account/${type}`}>더보기</Link>
          </MoreWrapper>
        ) : null}
        {movieList.length < 1 ? (
          <Title center="center">{title} 목록이 비었습니다!</Title>
        ) : null}
      </MovieList>
    </div>
  );
};
export default UserMovieList;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fdd007;
  ${tablet({
    display: "none",
  })}
`;
const MoreWrapper = styled.div`
  display: none;
  place-items: center;
  ${tablet({
    display: "grid",
  })}

  a {
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    min-height: 30px;
    background-color: #fdd007;
    color: #fff;
  }
`;

const TitleLeft = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-inline: ${({ center }) => (center ? "auto" : 0)};
`;

const MovieList = styled.ul`
  margin: 1rem 0;
  border: 1px solid #e5e5e5;
  padding: 1rem 0.75rem;
  border-radius: 4px;
  display: ${({ length }) => (length > 0 ? "grid" : "block")};
  grid-template-columns: repeat(5, 1fr);
  gap: 0.625rem;

  ${tablet({
    gridTemplateColumns: "repeat(3, 1fr)",
  })}
  ${mobile({
    gridTemplateColumns: "repeat(2, 50%)",
  })}
`;
