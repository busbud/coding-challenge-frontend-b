import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    box-sizing: border-box;
    @media screen and (max-width: 667px){
        flex-direction: column;
        align-items: flex-start;
        position: sticky;
    }
`;

const childSpacing = (spacing = 8) => css`
    margin-right: ${spacing}px;
    &:last-child {
        margin-right: 0
    }
`;

const itemAfterHover = css`
    &::after{
        content: "";
        display: block;
        width: 0%;
        height: 2px;
        background: ${({ theme }) => theme.colors.secondary};
        transition: all .4s cubic-bezier(.3, 1, .3, 1);
    }
    &:hover {
        &::after {
            width: 100%;
        }
    }
`;

export const LangWrapper = styled.div`
    display: flex;
    font-size: 18px;
    align-items: center;
    
    @media screen and (max-width: 667px){
        font-size: 16px;
        align-self: flex-end;
    }

    button {
        cursor: pointer;
        ${childSpacing}
        outline: none;
        opacity: .3;
        margin: 0;
        margin-right: 12px;
        background: none;
        padding: 0;
        font-size: 16px;
        text-transform: uppercase;
        border: none;
        color: ${({ theme }) => theme.colors.secondary};
        ${itemAfterHover}
        &:hover {
            opacity: 1;
        }
    }

    .active {
        opacity: 1;
        ${itemAfterHover}
        &::after {
            width: 100%;
        }
    }
`;

export const RoutesWrapper = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 667px){
        width: 100%;
        justify-content: space-between;
    }
    a {
        font-size: 24px;
        text-decoration: none;
        ${childSpacing(24)}
        font-weight: bold;
        ${itemAfterHover}
        color: ${({ theme }) => theme.colors.secondary};
        @media screen and (max-width: 667px){
            font-size: 18px;
            ${childSpacing(16)}
            svg {
                width: 150px;
            }
        }

        h1 {
            text-indent: -10000px;
            position: absolute;
        }
        svg {
            fill:${({ theme }) => theme.colors.secondary};
        }
    }
`;
