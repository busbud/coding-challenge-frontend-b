import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.div`
  text-align: center;
  font-size: 15px;
  color: gray;
`;
const ArrowWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Line = styled.div`
  width: 90px;
  border-top: 2px dotted gray;
`;
const Point = styled.div`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${props =>
    props.direction === "left"
      ? "rotate(135deg)"
      : props.direction === "right"
      ? "rotate(-45deg)"
      : props.direction === "up"
      ? "rotate(-135deg)"
      : "rotate(45deg)"};
`;

export default function Arrow(props) {
  return (
    <Wrap {...props}>
      <Text>{props.text}</Text>
      <ArrowWrap>
        { props.dotted && <Line></Line> }
        <Point direction={props.direction}></Point>
      </ArrowWrap>
    </Wrap>
  );
}
