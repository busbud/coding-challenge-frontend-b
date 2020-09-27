import React, { FC } from "react";

const HeroContent: FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-screen-md pb-8 overflow-hidden">
        <p
          className="inline-block text-3xl sm:text-4xl md:text-6xl text-yellow-500 uppercase mt-20 ml-10 "
          style={{
            transform: "rotate(-10deg)",
            fontFamily: "'Monoton', sans-serif",
          }}
        >
          {" "}
          Fauxsheaga
        </p>
        <div className="sm:mx-12 flex flex-col items-center text-yellow-500 mt-20 px-6 py-4 bg-off-black bg-opacity-75 sm:rounded-full text-center">
          <p className="font-bold">Book your one-way trip to fun.</p>
          <p>Easy access from select Canadian cities</p>
          <p>Party until the end of 2020!</p>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
