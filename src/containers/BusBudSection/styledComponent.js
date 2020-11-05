import styled from 'styled-components';
import { sectionStyle } from '../../components/GlobalStyle';

export const SectionWrapper = styled.div`
    ${sectionStyle}
    display: flex;
    @media screen and (max-width: 768px){
        flex-direction: column;
    }
    h1, h2 {
        font-size: 32px;
        @media screen and (max-width: 1280px){
            font-size: 28px;
        }
        @media screen and (max-width: 667px){
            font-size: 24px;
        }
    }
`;

export const FormWrapper = styled.div`
    flex-basis: 33%;
    padding: 0 16px;
    @media screen and (max-width: 768px){
        margin-bottom: 32px;
    }
`;

export const CardsWrapper = styled.div`
    display: grid;
    flex-basis: 66%;
    grid-template-columns: repeat(auto-fill, minmax(200px, 50%));
    &::before {
        content: '';
        width: 0;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    @media screen and (max-width: 1280px){
        grid-template-columns: repeat(auto-fill, minmax(200px, 100%));
    }
    @media screen and (max-width: 667px){
        grid-template-columns: repeat(auto-fill, minmax(300px, 100%));
    }
`;
