import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/api";
import requests from "../../api/requests";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(`movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [movieId]);

  const getSimilarMovie = async () => {
    const response = await instance.get(fetchSimilarMovie);
    set;
  };

  // const fetchReview = async () => {
  //   const response = await instance.get(requests.fetchReview);
  //   setReviews(response);
  //   console.log("response", response);
  // };

  // useEffect(() => {
  //   fetchReview();
  // }, []);

  return (
    <Container>
      <MovieContainer>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
          />{" "}
        </div>
        <div>
          <h1>{movie.title}</h1>
          <div>{movie.release_date}・</div>
          <div>{movie.tagline}</div>
          <div>평균★{movie.vote_average}</div>
        </div>
        <div>
          <div>평가하기</div>
          <div>
            <button type="button">보고싶어요</button>
            <button type="button">코멘트</button>
            <button type="button">보는 중</button>
            <button type="button">더 보기</button>
          </div>
        </div>
      </MovieContainer>
      <MovieInfoContainer>
        <div>
          <h2>기본 정보</h2>
        </div>
        <div>
          <div>{movie.original_title}</div>
          <p>{movie.runtime}분</p>
          <p>예산 {movie.budget}원</p>
          <div>{movie.overview}</div>
        </div>
        <div>
          <h2>출연/제작</h2>
        </div>
      </MovieInfoContainer>
      <ReviewContainer>
        <div>
          <h2>리뷰</h2>
        </div>
      </ReviewContainer>
      <SimilarMovieContainer>
        <h2>비슷한 작품</h2>
      </SimilarMovieContainer>
    </Container>
  );
};

const SimilarMovieContainer = styled.div``;

const ReviewContainer = styled.div``;

const MovieInfoContainer = styled.div``;

const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default DetailPage;
