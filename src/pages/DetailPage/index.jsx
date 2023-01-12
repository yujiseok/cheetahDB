import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import Slider from "react-slick";
import { instance } from "../../api/api";
import "../../global/slick-theme.css";
import "../../global/slick.css";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <TfiArrowCircleLeft
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={`slick-prev slick-arrow${
      currentSlide === 0 ? " slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === 0}
  />
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <TfiArrowCircleRight
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={`slick-next slick-arrow${
      currentSlide === slideCount - 1 ? " slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1}
  />
);

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [credits, setCredits] = useState([]);
  const [movieImg, setMovieImg] = useState("");

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(`movie/${movieId}`);
        setMovie(response.data);
        console.log(response.data);
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
    const fetchReview = async () => {
      const response = await instance.request(`/movie/${movieId}/reviews`, {
        params: { language: "en-US" },
      });
      setReviews(response.data.results);
      console.log("Review", response.data.results);
      console.log(response.data.results.author_details.avatar_path);
    };
    fetchReview();
  }, [movieId]);

  useEffect(() => {
    async function fetchMovieCredit() {
      const response = await instance.get(`/movie/${movieId}/credits`);
      setCredits(response.data.cast);
    }
    fetchMovieCredit();
  }, [movieId]);

  useEffect(() => {
    async function fetchMovieImage() {
      const response = await instance.get(`/movie/${movieId}/images`);
      setMovieImg(response.data.poster);
    }
    fetchMovieImage();
  }, [movieId]);

  return (
    <Container>
      <Background>
        <img src={movieImg} alt={movie} />
      </Background>
      <MovieContainer>
        <Poster>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />{" "}
        </Poster>
        <MovieInfo>
          <h1>{movie.title}</h1>
          <div>{movie.release_date?.slice(0, 4)}</div>
          <div>{movie.tagline}</div>
          <div>평균★{Math.round(movie.vote_average * 100) / 100}</div>
          <ButtonContainer>
            <Button type="button">
              {" "}
              <FaPencilAlt />
              코멘트
            </Button>
            <Button type="button">
              <FaEye />
              보는 중
            </Button>
            <Button type="button">
              <FiPlus />
              보고싶어요
            </Button>
            <Button type="button">
              <FiMoreHorizontal /> 더 보기
            </Button>
          </ButtonContainer>
        </MovieInfo>
      </MovieContainer>
      <InnerContainer>
        <MovieInfoContainer>
          <div>
            <h2>기본 정보</h2>
          </div>
          <div className="movie-info">
            <div className="original-title">{movie.original_title}</div>
            <p>{movie.runtime}분</p>
            <p>${movie.budget?.toLocaleString()}</p>
            <div className="overview">{movie.overview}</div>
          </div>
        </MovieInfoContainer>
        <CastInfoContainer>
          <h2>출연</h2>
          <CastlistContainer>
            {credits.slice(0, 8).map((credit) => (
              <div key={credit.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${credit.profile_path}`}
                  alt={credit.name}
                />
                <div className="castlistInfo">
                  <p>{credit.original_name}</p>
                  <p>|| {credit.character}</p>
                </div>
              </div>
            ))}
          </CastlistContainer>
        </CastInfoContainer>
        <ReviewContainer>
          <div>
            <h2>리뷰</h2>
          </div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...settings}>
            {reviews?.slice(0, 12)?.map((review) => {
              return (
                <div key={review.created_at}>
                  <ReviewHeader>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${review.author_details.avatar_path}`}
                      alt="profile"
                    />
                    <div>{review.author}</div>
                  </ReviewHeader>
                  <ReviewContents>
                    <p>{review.content}</p>
                    <p>{review.updated_at.slice(0, 10)}</p>
                  </ReviewContents>
                </div>
              );
            })}
          </Slider>
        </ReviewContainer>
        <SimilarMovieContainer>
          <h2>비슷한 작품</h2>
          <SimilarMovie>
            {similar.map((movie) => {
              const movieImageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "img/alternativeImg.png";
              return (
                <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id}>
                    <img src={movieImageUrl} alt={movie.name} />
                    <div>
                      <h4>{movie.title}</h4>
                      <p className="year">
                        {(movie.first_air_date || movie.release_date)?.substr(
                          0,
                          4,
                        )}
                      </p>
                      <p className="average">
                        평균★{Math.round(movie.vote_average * 100) / 100}
                      </p>
                    </div>
                  </div>
                </Link>
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
  grid-template-columns: repeat(5, 1fr);
  padding: 2rem 3rem;
  row-gap: 1.2rem;
  column-gap: 1rem;
`;

const SimilarMovieContainer = styled.div`
  padding: 2rem;
  img {
    width: 200px;
    height: calc(200px * 4 / 3);
    position: relative;
    display: block;
    border-radius: 0.25rem;
    margin: 0 auto;
    border: 1px solid #eae9e8;
  }
  p {
    font-size: 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
`;

const ReviewContents = styled.div`
  p {
    margin-top: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  font-size: 16px;
  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
`;

const ReviewContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem;
  .slick-track {
    padding-top: 20px;
  }
  .slick-slide {
    border: 1px solid #eae9e8;
    border-radius: 20px;
    margin: 10px 0;
    padding: 30px 10px;
    height: 280px;
  }
`;

const MovieInfoContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem;
  p {
    margin-bottom: 10px;
  }
  .original-title {
    margin-bottom: 1rem;
    font-size: 20px;
  }
  .movie-info {
    margin-top: 1rem;
    .overview {
      line-height: 1.5;
      margin-top: 1rem;
    }
  }
`;

const CastlistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem 0;
  row-gap: 1.25rem;
  p {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*만들고 싶은 줄 수, 2줄까지 보여지게 하려면 2를 입력한다*/
    overflow: hidden;
  }
  div {
    height: 5rem;
    /* display: flex; */
    margin: o auto;
    display: flex;
  }
  .castlistInfo {
    flex-direction: column;
    justify-items: center;
    margin-left: 1.25rem;
  }
`;

const CastInfoContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 2rem 2rem 0;
  line-height: 2;
  img {
    object-fit: cover;
    border-radius: 50%;
    width: 4.25rem;
    height: 4.25rem;
  }
`;

const InnerContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 0.625rem;
  padding: 2rem;
  margin-top: 3.5rem;
`;

const Button = styled.button`
  border-right: 1px solid #eae9e8;
  padding: 20px 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const MovieInfo = styled.div`
  margin-left: 1.875rem;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 10px;
  }
  div {
    color: #5b5b5b;
    margin-bottom: 6px;
  }
`;

const Poster = styled.div`
  img {
    border: 1px solid #eae9e8;
    padding: 10px;
    height: 300px;
  }
`;

const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3.5rem;
  padding: 2rem;
`;

const Background = styled.div`
  position: absolute;
  height: 300px;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: -1;
  background-color: orange;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

export default DetailPage;
