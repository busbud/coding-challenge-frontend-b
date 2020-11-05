import styled, { keyframes } from 'styled-components';

export const CardWrapper = styled.div`
    margin: 16px;
    background: ${({ theme }) => theme.colors.primaryShade2};
    overflow: hidden;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.mainBoxShadow};
    position: relative;
    h3 {
        margin: 0;
        text-align: center;
        padding: 12px 0;
        font-family: sans-serif;
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.secondary};
    }
    p {
        margin: 0;
        padding: 12px;
        font-family: sans-serif;
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

const loading = keyframes`
    0% {
        transform: translateX(-120%);
        opacity: .1;
    }
    50% {
        transform: translateX(0) scaleZ(0.5);
        opacity: .3;
    }
    100% {
        transform: translateX(120%);
        opacity: 1;
    }
`;

const opacity = keyframes`
   0% {
        opacity: .1;
    }
    100% {
        opacity: 1;
    } 
`;

export const LazyResult = styled.div`
    min-width: 200px;
    min-height: 200px;
    position: relative;
    box-shadow: ${({ theme }) => theme.mainBoxShadow};
    overflow: hidden;
    margin: 8px; 
    background: ${({ theme }) => theme.colors.primaryShade1}40;
    animation: ${opacity} 4s ease-in-out infinite;
    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colors.secondary}30;
        animation: ${loading} 1.5s cubic-bezier(0.3, 1, 0.3, 1) infinite;
    }
`;


export const CardHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 12px;
    box-sizing: border-box;
    align-items: flex-start;
    h2 {
        margin: 0;
        font-family: sans-serif;
        color: ${({ theme }) => theme.colors.secondary};
    }
    svg {
        width: 150px;
    }
    .st0 {
        fill: ${({ theme }) => theme.colors.secondaryShade1}
    }
`;

export const CTA = styled.button`
    width: 100%;
    height: 50px;
    background: ${({ theme }) => theme.colors.highlight};
    colors: ${({ theme }) => theme.colors.primary}
    text-align: center;
    border: none;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
`;

export const TripWrapper = styled.div`
    background: ${({ theme }) => theme.colors.primaryShade1};
    padding: 12px;
`;

export const PlanWrapper = styled.div`
    display: flex;
    button {
        font-size: 16px;
        flex-basis: 33.33%;
        padding: 12px 0;
        border: none;
        opacity: .4;
        cursor: pointer;
        outline: none;
        span {
            pointer-events: none;
            font-size: 14px;
        }
    }
    .active {
        opacity: 1;
    }
    .basic {
        background: #AAA9AD;
    }
    .gold {
        background: #D4AF37;
    }
    .platinum {
        background: #E5E4E2;
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: sans-serif;
    align-items: center;
    margin: 8px 0;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.secondary};
    small{
        font-size: 14px;
        margin: 0;
        opacity: .7;
    }
    h4 {
        margin: 0;
    }
    h4.price {
        color: ${({ theme }) => theme.colors.highlight};
    }
`;

export const AmenitiesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    p{
        margin: 8px;
        padding: 4px 8px;
        border-radius: 15px;
        background: ${({ theme }) => theme.colors.secondaryShade2};
        color: ${({ theme }) => theme.colors.primary};
        margin-right: 8px;
        &:last-child{
            margin-right: 0;
        }
    }
`;

export const Button = styled.button`
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    outline: none;
    font-size: 16px;
    margin-bottom: 12px;
    padding: 0;
    svg {
        margin-left: 4px;
        fill: ${({ theme }) => theme.colors.secondary};
    }
`;
