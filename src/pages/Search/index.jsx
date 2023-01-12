import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { instance } from "../../api/api";
import { useDebounce } from "../../hooks/useDebounce";
import { mobile, tablet } from "../../global/responsive";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = useDebounce(query.get("q"), 500);

  // eslint-disable-next-line no-shadow
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const res = await instance.get(
        `/search/multi?include_adults=false&query=${searchTerm}&page=${pageNumber}`,
      );

      setTotalPages(res.data.total_pages);
      setMovies(res.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm, pageNumber]);

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  if (movies.length > 0) {
    return (
      <Container>
        <MovieList>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <ImgContainer>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.name}
                  />
                </ImgContainer>
                <Info>
                  <h3>{movie.title || movie.name}</h3>
                  <p className="year">
                    {(movie.first_air_date || movie.release_date)?.substr(0, 4)}
                  </p>
                  <p className="average">평균★{movie.vote_average}</p>
                </Info>
              </Link>
            </li>
          ))}
        </MovieList>

        <ReactPaginate
          previousLabel={<HiChevronLeft />}
          nextLabel={<HiChevronRight />}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName="pagination-container"
          pageLinkClassName="btn"
          previousLinkClassName="prevBtn"
          nextLinkClassName="nextBtn"
          disabledClassName="disabled"
          activeClassName="active"
        />
      </Container>
    );
  }
  return (
    <Container>
      <EmptyResult>검색어 {searchTerm}에 맞는 영화가 없습니다.</EmptyResult>
    </Container>
  );
};
export default Search;

const Container = styled.section`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  margin-top: 3.125rem;
  height: 100%;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  ${tablet({
    gridTemplateColumns: "repeat(4, 1fr)",
  })}
  ${mobile({
    gridTemplateColumns: "repeat(2, 50%)",
  })}
`;

const Info = styled.div`
  padding-top: 0.5rem;
  .year {
    margin-top: 0.25rem;
  }
  .average {
    margin-top: 4px;
  }
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
`;

const ImgContainer = styled.div`
  height: 380px;
  border: 1px solid #eae9e8;
  border-radius: 5px;
  overflow: hidden;
  object-fit: cover;

  ${tablet({
    height: 330,
  })}

  img {
    height: 100%;
    width: 100%;
    position: relative;
    display: block;
    border-radius: 0.25rem;
    margin: 0 auto;
  }
`;

const EmptyResult = styled.h2`
  margin-bottom: 350px;
  display: grid;
  place-items: center;
  height: 100%;
`;
