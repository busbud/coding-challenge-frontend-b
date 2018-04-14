import styled, { injectGlobal, StyledFunction } from 'styled-components';

injectGlobal`
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); 
        // background: linear-gradient(rgb(14, 138, 197), rgb(7, 155, 188), rgb(117, 205, 245));
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
`;

export const DepartureListItem = styled.li`
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 20px;
    width: 100%;
    margin: 10px 0;
`;

export const Ul = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;


interface CitiesListItemProps { backgroundImg: string; }
const typedCitiesListItem: StyledFunction<CitiesListItemProps & React.HTMLProps<HTMLLIElement>> = styled.li;
export const CitiesListItem = typedCitiesListItem`
    flex: 1;
    min-height: 200px;
    background: url(${props => props.backgroundImg});
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;

    > h3 {
        text-align: center;
    }
`;

export const Footer = styled.footer`
    min-height: 35vw;
    background-image: url(oshegaFooter.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
`;

export const Header = styled.header`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 150px;
`;

export const HeaderH1 = styled.h1`
    padding-right: 15px;
    color: #fff;
    font-family: sans-serif;
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
`;
