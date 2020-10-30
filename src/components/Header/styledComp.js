import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
`;

const childSpacing = css`
    margin-right: 8px;
    &:last-child {
        margin-right: 0
    }
`;

export const LangWrapper = styled.div`
    button {
        ${childSpacing}
    }
`;

export const RoutesWrapper = styled.div`
    a {
        ${childSpacing}
    }
`;
