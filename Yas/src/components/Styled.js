import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: #4f7a5af5;
  align-items: center;
  flex: 1;
  > h3 {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 24px 0 8px;
    font-size: 40px;
    margin: 45px;
    color: wheat;
    flex: 1;
  }
`;

export const StyledTextbox = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    font-size: 18px;
    font-weight: bold;
    justify-content: flex-start;
    display: flex;
    margin: 8px 8px 8px 26px;
  }
  > input {
    width: 220px;
    height: 60px;
    margin-left: 24px;
    padding-left: 8px;

    ~ label {
      font-size: 54px;
      align-items: center;
      background-color: white;
      color: ${props => props.theme.disabledColor};
      cursor: pointer;
      display: flex;
      justify-content: stretch;
      margin: 0;
      padding: 6px;
      position: relative;
      width: 100%;
      font-size: 16px;

      &:hover {
        background-color: ${props => props.theme.brandPrimary};
        color: ${props => props.theme.brandOnPrimary};
      }

      i {
        color: transparent;
        flex: 0 0 auto;
      }
    }
  }
`;

export const Button = styled.button`
  font-weight: bold;
  font-size: 18px;
  background: wheat;
  color: white;
  padding: 20px;
  border: none;
  border-radius: 2px;
  width: 16%;
  margin: 45px 0 35px 0;
  cursor: pointer;
`;

export const Panel = styled.div`
  background-color: whitesmoke;
  border-collapse: collapse;
  box-shadow: 2px 2px 2px -1px black;
  padding: 16px;
  margin: 32px;

  > h3 {
    border-bottom: 1px solid #4f7a5af5;
    display: flex;
    justify-content: space-between;
    padding: 24px 0 8px;
    font-size: 20px;
    margin: 0 16px;
  }
`;
export const TimeWrapper = styled.div`
  margin: 10px;
  color: #4f7a5af5;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: emoji;
  font-weight: bold;
  font-size: 24px;
  flex: 1;
  > p {
    color: #4f7a5af5;
  }
`;
export const StyledExpandable = styled.div`
  justify-content: center;
  display: flex;
  font-family: emoji;
  font-size: 18px;
  color: lightslategrey;
  font-weight: bold;
`;
export const Currency = styled.div`
  display: flex;
  font-family: emoji;
  font-weight: bold;
  color: #4f7a5af5;
  font-size: 24px;
  align-items: center;
  margin-right: 24px;
`;

export const LocationIndicator = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 4px;
  background-color: #4f7a5af5;
`;
export const Timeline = styled.div`
  position: relative;
  display: flex;
  height: 100px;
  margin: 2px 0 0 7px;
  border-left: 4px dashed #ddd;
`;
export const TimelineWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const LocationName = styled.div`
  color: #4f7a5af5;
`;
export const DepartureTime = styled.div`
  font-size: 24px;
  color: #4f7a5af5;
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8px;
`;
export const Info = styled.div`
  margin-left: 8px;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    font-size: 18px;
    font-weight: bold;
    justify-content: flex-start;
    display: flex;
    margin: 8px 8px 8px 26px;
  }
`;
export const Language = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  > p {
    font-size: 12px;
    color: white;
    margin: 8px;
    cursor: pointer;
  }
`;
export const LoaderWrapper = styled.div`
  position: absolute;
  right: 50%;
  top: 40%;
`;