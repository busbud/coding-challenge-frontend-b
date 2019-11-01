import { css } from 'styled-components';

// bootstrap breakpoints
const sizes = {
   mobile: 576,
   portriat: 768,
   landscape: 992,
   desktop: 1200
}

export default Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {})