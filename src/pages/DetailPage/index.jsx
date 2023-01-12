import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/api";
import requests from "../../api/requests";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState({});
  const [credits, setCredits] = useState([]);

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

  useEffect(() => {
    async function getSimilarMovie() {
      const response = await instance.get(`movie/${movieId}/similar`);
      setSimilar(response.data.results);
    }
    getSimilarMovie();
  }, [movieId]);

  useEffect(() => {
    async function fetchReview() {
      const response = await instance.get(`/movie/${movieId}/reviews`);
      setReviews(response.data.results);
    }
    fetchReview();
  }, [movieId]);

  useEffect(() => {
    async function fetchMovieCredit() {
      const response = await instance.get(`/movie/${movieId}/credits`);
      console.log("credit", response.data.cast);
      setCredits(response.data.cast);
    }
    fetchMovieCredit();
  }, [movieId]);

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
      <InnerContainer>
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
        </MovieInfoContainer>
        <CastInfoContainer>
          <h2>출연/제작</h2>
          <CastlistContainer>
            {credits.map((credit) => (
              <div key={credit.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${credit.profile_path}`}
                  alt={credit.name}
                />
                <p>{credit.character}</p>
              </div>
            ))}
          </CastlistContainer>
        </CastInfoContainer>
        <ReviewContainer>
          <div>
            <h2>리뷰</h2>
          </div>
        </ReviewContainer>
        <SimilarMovieContainer>
          <h2>{movie.title}과 비슷한 작품</h2>
          <SimilarMovie>
            {similar.map((movie) => {
              const movieImageUrl = movie.poster_path
                ? "https://image.tmdb.org/t/p/w200" + movie.poster_path
                : "img/alternativeImg.png";
              return (
                <div key={movie.id}>
                  <img src={movieImageUrl} alt={movie.name} />
                  <h4>{movie.title}</h4>
                  <p className="year">
                    {(movie.first_air_date || movie.release_date)?.substr(0, 4)}
                  </p>
                  <p className="average">평균★{movie.vote_average}</p>
                </div>
              );
            })}
          </SimilarMovie>
        </SimilarMovieContainer>
      </InnerContainer>
    </Container>
  );
};

const SimilarMovie = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem;
`;

const SimilarMovieContainer = styled.div`
  padding: 2rem;

  div {
  }
  img {
    /* height: 100%;
    width: 100%; */
    position: relative;
    display: block;
    border-radius: 0.25rem;
    margin: 0 auto;
  }
  p {
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
`;

const ReviewContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem;
`;

const MovieInfoContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem;
`;

const CastlistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  div {
    width: 300px;
    height: 80px;
  }
`;

const CastInfoContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem;
  img {
    object-fit: cover;
    /* width: 100%; */
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
  padding: 2rem;
`;

const InnerContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 2rem;
  margin-top: 56px;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default DetailPage;
