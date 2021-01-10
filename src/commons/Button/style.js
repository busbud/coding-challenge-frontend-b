import styled from "styled-components";

const colorsMap = {
  default: {
    background: "var(--gray)",
    color: "var(--black)",
    hover: "var(--light-gray)",
  },
  primary: {
    background: "var(--orange)",
    color: "var(--white)",
    hover: "var(--light-orange)",
  },
};

export const StyledButton = styled.button`
  width: 100%;
  background-color: ${({ color }) => colorsMap[color]?.background};
  border: none;
  border-radius: 4px;
  color: ${({ color }) => colorsMap[color]?.color};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px 12px;

  &:hover {
    background-color: ${({ color }) => colorsMap[color]?.hover};
  }
`;
