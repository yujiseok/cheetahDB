import { Link } from "react-router-dom";
import styled from "styled-components";
import { tablet } from "../global/responsive";

const MovieCard = ({ movie }) => {
  return (
    <List key={movie.id}>
      <Link to={`/movie/${movie.id}`}>
        <div>
          <ImgWrapper
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="poster"
          />
        </div>
        <MovieTitleWrapper>
          <MovieTitle>{movie.title}</MovieTitle>
          {movie.rating ? <Rate>⭐ {Math.ceil(movie.rating / 2)}</Rate> : null}
        </MovieTitleWrapper>
      </Link>
    </List>
  );
};
export default MovieCard;

const ImgWrapper = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #eae9e8;
  border-radius: 4px;
  object-fit: cover;
  transition: transform 0.2s ease;
`;

const List = styled.li`
  /* width: 20%; */
  font-weight: 600;
  &:hover ${ImgWrapper} {
    transform: scale(1.05);

    ${tablet({
      transform: " scale(1)",
    })}
  }
`;

const MovieTitle = styled.span`
  font-size: 0.875rem;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  ${tablet({
    fontSize: "0.8rem",
  })}
`;

const MovieTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Rate = styled.span`
  display: block;
  color: #5b5b5b;
  font-size: 0.8125rem;
  padding: 0.125rem 0.25rem;
  background-color: #e5e5e5;
  border-radius: 4px;

  ${tablet({
    fontSize: "0.75rem",
  })}
`;
