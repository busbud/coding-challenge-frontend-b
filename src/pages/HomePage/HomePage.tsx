import React from "react";

function HomePage(): JSX.Element {
  return (
    <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
      <span className="font-bold uppercase text-yellow-400">
        Travel to Osheaga
      </span>
      <h1 className="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
        Find one-way departure times for the opening weekend of the festival.
      </h1>
      <a
        href="/"
        className="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10"
      >
        Discover
      </a>
    </div>
  );
}

export default HomePage;
