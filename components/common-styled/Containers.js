import React from "react";
import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const FullWidth = styled.section`
  display: flex;
`;
export const SiteWidth = styled.div`
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: calc(100% - 32px);
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ColumnGrow = styled(Column)`
  flex-grow: 1;
`;
