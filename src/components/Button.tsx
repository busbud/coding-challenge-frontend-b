import styled, { css } from "styled-components";
import { rgba, darken } from "polished";

import { colors, fonts } from "@/theme";

interface Props {
  isLoading?: boolean;
  size?: "default" | "small";
  variant?: "primary" | "secondary";
}

const buttonColors = {
  primary: {
    main: colors.primary,
    dark: colors.primaryDark,
  },
  secondary: {
    main: colors.secondary,
    dark: colors.secondaryDark,
  },
};

const buttonFontSize = {
  default: "18px",
  small: "16px",
};

const buttonPadding = {
  default: "12px 28px",
  small: "10px 22px",
};

export const Button = styled.button<Props>`
  border: 0;
  border-radius: 9999px;
  appearance: none;
  color: ${colors.light};
  font-weight: bold;
  font-family: ${fonts.body};
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;

  ${({ isLoading, size = "default", variant = "primary" }) => css`
    background: ${buttonColors[variant].main};
    box-shadow: 0 2px 8px ${rgba(buttonColors[variant].dark, 0.2)};
    font-size: ${buttonFontSize[size]};
    padding: ${buttonPadding[size]};

    &:hover {
      background: ${darken(0.075, buttonColors[variant].main)};
    }

    ${isLoading &&
    css`
      color: transparent;
      pointer-events: none;

      &::after {
        content: "";
        width: 24px;
        height: 24px;
        background: url("/spinner.svg") no-repeat center center / contain;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
  `}
`;
