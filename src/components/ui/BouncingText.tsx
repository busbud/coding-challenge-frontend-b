import React from "react";
import "./BouncingText.css";

interface BouncingTextProps {
  colors: Array<string>;
  fontSize: number;
}

export default class extends React.Component<BouncingTextProps, any> {
  getRandomInt(min: number, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  shouldComponentUpdate(nextProps: BouncingTextProps) {
    if (nextProps.colors !== this.props.colors) {
      return true;
    }
    return false;
  }
  render() {
    const children = [this.props.children];
    let letters;
    children.forEach(child => {
      if (typeof child === "string") {
        const lettersArray = child.split("");
        letters = lettersArray.map((letter, index) => {
          let space = letter === " " ? true : false;
          const randomColor = this.props.colors[
            this.getRandomInt(0, this.props.colors.length)
          ];
          return (
            <div
              key={index}
              className={`shaky-letter shaky-letter--${index} ${
                space ? "shaky-letter--space" : ""
              }`}
            >
              {letter}
              <style>{`.shaky-letter--${index} { 
                color: ${randomColor};
                animation: shaky-letter infinite;
                animation-duration: 1s; 
                animation-delay: ${index / 10}s;
                display: inline-block;
                font-size: ${this.props.fontSize / 1.5}px;
                } 
                @media screen and (min-width: 760px) {
                    .shaky-letter--${index} {
                        font-size: ${this.props.fontSize}px;
                    }
                }
            
            `}</style>
            </div>
          );
        });
      }
    });
    return <div className="shaky-letters-container">{letters}</div>;
  }
}
