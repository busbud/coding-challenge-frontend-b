import styled from "styled-components";

export const Loader = styled.div`
  @keyframes background_dance {
    from {
      background-color: var(--light-gray);
    }

    to {
      background-color: var(--gray);
    }
  }

  width: 100%;
  height: 12px;
  animation: background_dance 0.4s infinite alternate-reverse;
  border-radius: 10px;
  display: block;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;
