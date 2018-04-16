import styled, { StyledFunction } from "styled-components";

const formatBackgroundImage = (imageUrl: string, width: string, height: string): string => 
    imageUrl.replace(/{width}/, width).replace(/{height}/, height);


export const DepartureListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 10px 30px;
    width: 100%;
    margin: 10px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    @media (max-width: 620px) {
    }  
`;

interface OperatorLogoProps { backgroundImg: string; }
const typedOperatorLogo: StyledFunction<OperatorLogoProps & React.HTMLProps<HTMLDivElement  >> = styled.div;
export const OperatorLogo = typedOperatorLogo`
    background: url(${props => formatBackgroundImage(props.backgroundImg, "100", "100")});
    background-repeat: no-repeat;
    background-size: contain;
    width: 100px;
    height: 100px;
    padding-right: 20px;

    @media (max-width: 620px) {
        width: 80px;
        height: 80px;
    }

    @media (max-width: 420px) {
      display: none;
  }
`;

export const DepartureTimes = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    @media (max-width: 620px) {
        width: 60%;
    }
`;

export const PlusDays = styled.small`
    position: relative;
    top: -10px; 
`;

export const DeparturePrices = styled.button`
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    color: #0898bd;
    cursor: pointer;
    border: 1px solid;
`;

export const Times = styled.p`
    width: 30%;
    font-size: 14px;

    b {
      font-size: 16px;
    }

    @media (max-width: 620px) {
      width: auto;
    }
`;

export const Location = styled.span`
  @media (max-width: 620px) {
      display: none;
  }
`;

export const Duration = styled.div`
  padding-right: 15px;

  h4 {
    font-size: 16px;
    margin: 10px;
  }

  @media (max-width: 620px) {
    padding: 0;
    width: 70px;

    h4 {
        display: none;
    }
  }
`;