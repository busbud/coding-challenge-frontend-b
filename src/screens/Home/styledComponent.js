import styled from 'styled-components';

export const HomeTitle = styled.h1`
    text-align: center;
    font-size: 48px;
    width: 50%;
    margin: 32px auto;
    @media screen and (max-width: 667px){
        width: 80%;
        font-size: 36px;
    }
`;

export const HomeWrapper = styled.div`
    margin-bottom: 10vh;
    >img {
        display: block;
        width: 40%;
        margin: 0 auto;
    }
    @media screen and (max-width: 667px){
        margin-bottom: 35vh;
        >img {
            width: 70%;
        }
    }
    @media screen and (max-width: 812px){
        margin-bottom: 25vh
    }
`;
