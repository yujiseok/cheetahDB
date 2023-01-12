import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { instance } from "../../api/api";
import MovieCard from "../../components/MovieCard";
import Spinner from "../../components/Spinner";
import { mobile, tablet } from "../../global/responsive";

const MovieLists = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { type } = useParams();

  const userId = JSON.parse(localStorage.getItem("userId"));
  const sessionId = JSON.parse(localStorage.getItem("session"));
  const [movieList, setMovieList] = useState([]);
  // eslint-disable-next-line no-shadow, consistent-return
  const titleSelector = (type) => {
    switch (type) {
      case "favorite":
        return "좋아요한 영화";
      case "rated":
        return "평가한 영화";
      case "watchlist":
        return "시청한 영화";
      default:
        break;
    }
  };

  const title = titleSelector(type);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const res = await instance.request({
          url: `/account/${userId}/${type}/movies?&session_id=${sessionId}&sort_by=created_at.desc&page=${pageNumber}`,
          method: "get",
        });

        if (res.status === 200) {
          setTotalPages(res.data.total_pages);
          setMovieList(res.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovieList();
  }, []);

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <Container>
      <h2>{title}</h2>
      {/* <Spinner /> */}
      <CardWrapper length={movieList.length}>
        {movieList.length > 0 ? (
          movieList.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <Title>{title} 목록이 비었습니다!</Title>
        )}
      </CardWrapper>

      {totalPages > 1 ? (
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
      ) : null}
    </Container>
  );
};
export default MovieLists;

const Container = styled.section`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  margin-top: 3.125rem;
`;

const CardWrapper = styled.ul`
  display: ${({ length }) => (length > 0 ? "grid" : "block")};
  grid-template-columns: repeat(5, 1fr);
  column-gap: 0.75rem;
  row-gap: 1.5rem;
  margin-top: 1.5rem;

  ${tablet({
    gridTemplateColumns: "repeat(2, 1fr)",
  })}
  ${mobile({
    gridTemplateColumns: "repeat(1, 1fr)",
  })}
`;
const Title = styled.h2`
  font-size: 1.25rem;
`;
