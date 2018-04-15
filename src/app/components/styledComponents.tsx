import styled, { injectGlobal, StyledFunction } from 'styled-components';

const formatBackgroundImage = (imageUrl: string, width: string, height: string): string => 
    imageUrl.replace(/{width}/, width).replace(/{height}/, height);


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

export const DepartureListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 0 30px;
    width: 100%;
    margin: 10px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
    
      
    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`;

export const Ul = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

interface OperatorLogoProps { backgroundImg: string; }
const typedOperatorLogo: StyledFunction<OperatorLogoProps & React.HTMLProps<HTMLDivElement  >> = styled.div;
export const OperatorLogo = typedOperatorLogo`
    background: url(${props => formatBackgroundImage(props.backgroundImg, "120", "120")});
    background-repeat: no-repeat;
    background-size: contain;
    width: 120px;
    height: 120px;
`;

export const DepartureTimes = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    > div {
        padding-right: 15px;
    }

    p {
        width: 30%;
        font-size: 14px;
    }

    b {
        font-size: 16px;
    }

    h4 {
        font-size: 16px;
        margin: 10px;
    }
`;


export const DeparturePrices = styled.div`
    display: flex;
`;

export const Footer = styled.footer`
    min-height: 35vw;
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

export const Button = styled.button`
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    color: #0898bd;
    cursor: pointer;
    border: 1px solid;
`;
