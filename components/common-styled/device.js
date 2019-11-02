import { css } from "styled-components";

// bootstrap breakpoints
const sizes = {
  mobile: 576,
  portriat: 768,
  landscape: 992,
  desktop: 1200
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
