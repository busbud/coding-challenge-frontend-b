import styled from 'styled-components';
import { sectionStyle } from '../../components/GlobalStyle';

export const SectionWrapper = styled.div`
    ${sectionStyle}
    h1 {
        font-size: 32px;
    }
`;

export const ArtistsWrapper = styled.div`
    display: grid;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    grid-template-columns: repeat(auto-fill, minmax(200px, 33%));
    grid-auto-rows: 1fr;

    &::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    @media screen and (max-width: 1040px){
        grid-template-columns: repeat(auto-fill, minmax(200px, 50%));
    }
    @media screen and (max-width: 667px){
        grid-template-columns: repeat(auto-fill, minmax(300px, 100%));
    }
`;
