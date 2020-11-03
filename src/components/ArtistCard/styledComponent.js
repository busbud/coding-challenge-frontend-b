/* eslint-disable no-restricted-globals */
import styled, { css, keyframes } from 'styled-components';

const playing = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
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

const divStyle = css`
    min-width: 200px;
    min-height: 200px;
    position: relative;
    box-shadow: ${({ theme }) => theme.mainBoxShadow};
    overflow: hidden;
    margin: 8px; 
`;

export const LazyArtist = styled.div`
    ${divStyle}
    background: ${({ theme }) => theme.colors.primaryShade1}40;
    &::before {
        content: '';
        display: block;
        position: absolute;
        right: 16px;
        bottom: 24px;
        width: 200px;
        height: 24px;
        animation: ${opacity} 4s ease-in-out infinite;
        background: ${({ theme }) => theme.colors.secondaryShade1}40;
    }
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

export const CardWrapper = styled.div`
    ${divStyle}
    transition: all .7s cubic-bezier(0.3, 1, 0.3, 1);
    border-radius: 8px;
    button {
        opacity: 0;
        transition: all 1s cubic-bezier(0.3, 1, 0.15, 1);
    }
    ${({ isMobile }) => !isMobile && css`
        a,p {
            transition: all 1s cubic-bezier(0.3, 1, 0.15, 1);
        }
        a {
            opacity: 0;
            transform: translateY(100%);
        }
        p {
            transform: translateY(100%);
        }
    `}
    ${({ isPlaying }) => isPlaying && css`
        border-radius: 50%;
        p {
            display: none;
        }
        a {
            display: none;
        }
        button {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5)
        }
    `}
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primary}00 0%, ${theme.colors.primary}99 100%)`};
    }
    img {
        ${({ isPlaying, duration }) => isPlaying && css`
            animation: ${playing} ${duration / 3}s linear infinite;
        `}
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        transition: transform 1s cubic-bezier(0.3, 1, 0.15, 1);
    }
    &:hover {
        img {
            transform: scale(1.05);
        }
        a {
            opacity: 1;
            transform: translateY(0%);
        }
        p {
            transform: translateY(0%);
        }
        button {
            opacity: 1;
        }
    }
`;

export const PlayButton = styled.button`
    width: 100%;
    height: 40px;
    position: absolute;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    margin: none;
    outline: none;
    cursor: pointer;
    background: transparent;
    padding: 0;
    display: flex;
    justify-content: center;
    line-height: 50px;
    .playBackground{
        stroke-dashoffset: 160;
        border-radius: 50px;
        fill: ${({ theme }) => theme.colors.primary};
        stroke: ${({ theme }) => theme.colors.highlight};
        stroke-dasharray: ${({ strokeDashArray }) => (!isNaN(strokeDashArray) ? parseInt(strokeDashArray, 10) + 160 : 160)};
        transition: stroke-dasharray 1s linear;
        transform: rotate(-90deg);
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const Link = styled.a`
    padding: 5px 10px 6px 6px; 
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.primaryShade1};
    border-radius: 25px;
    svg {
        margin-right: 5px; 
    }
`;

export const ArtistWrapper = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1;
    right: 16px;
    bottom: 16px;
    p {
        margin: 0;
        font-size: 24px;
        margin-bottom: 16px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const PlayPauseWrapper = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    position: absolute;
    z-index: 2;
    justify-content: flex-end;
    align-self: center;
    .playPause {
        fill: ${({ theme }) => theme.colors.highlight};
        height: 100%;
    }
`;
