import { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/api";

import "../global/slick-theme.css";
import "../global/slick.css";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <TfiArrowCircleLeft
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
    {...props}
    className={`slick-next slick-arrow${
      currentSlide === slideCount - 1 ? " slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1}
  />
);

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
  };

  const fetchMovie = async () => {
    const response = await instance.get(fetchUrl);
    setMovies(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <Container>
      <h2>{title}</h2>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {movies.map((movie, i) => {
          return (
            <Slide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <ImgContainer>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.name}
                  />
                  <div>{i + 1}</div>
                </ImgContainer>
                <Info>
                  <h3>{movie.title}</h3>
                  <p className="year">
                    {(movie.first_air_date || movie.release_date)?.substr(0, 4)}
                  </p>
                  <p className="average">평균★{movie.vote_average}</p>
                </Info>
              </Link>
            </Slide>
          );
        })}
      </Slider>
    </Container>
  );
};
export default Row;

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
  img {
    height: 100%;
    width: 100%;
    position: relative;
    display: block;
    border-radius: 0.25rem;
    margin: 0 auto;
  }
  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.77);
    color: #ffffff;
    font-weight: 700;
    border-radius: 4px;
    text-align: center;
    padding: 8px;
    top: 8px;
    margin-left: 8px;
  }
`;

const Slide = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;
