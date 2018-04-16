import styled, { injectGlobal } from 'styled-components';

injectGlobal`
    body {
        margin: 0;
        padding: 0;
        font-family: 'IBM Plex Sans', sans-serif;
        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); 
    }
`

export const Root = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`;

export const Container = styled.div`
    padding: 20px;
    max-width: 1080px;
    margin: auto;
    position: relative;
`;

export const Ul = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;


export const Footer = styled.footer`
    min-height: 24vw;
    background-image: url(oshegaFooter.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
`;

export const Header = styled.header`
    padding-top: 10vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 150px;
`;

export const HeaderH1 = styled.h1`
    padding-right: 15px;
    color: #fff;
`;

export const Image = styled.img`
    max-width: 100%;
    height: 80px;
`;


