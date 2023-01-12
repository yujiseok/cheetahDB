import { css } from "styled-components";

export const desktop = (props) => {
  return css`
    @media screen and (min-width: 1024px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media screen and (max-width: 400px) {
      ${props}
    }
  `;
};
