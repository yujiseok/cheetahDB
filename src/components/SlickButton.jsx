import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
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
export const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
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
