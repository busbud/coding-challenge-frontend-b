import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: var(--blue);
  color: var(--white);
  text-align: left;
  padding: 32px 0;
  margin-bottom: 24px;
`;

export const Top = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  .ant-select-arrow {
    color: var(--white);
  }
`;

export const Logo = styled.a`
  width: 108px;
`;

export const Title = styled.h2`
  color: var(--white);
  font-size: 36px;
  line-height: 40px;
  margin-bottom: 16px;
`;
