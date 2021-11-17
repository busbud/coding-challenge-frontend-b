import React from "react";
import { Link } from "react-router-dom";

function HomePage(): JSX.Element {
  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
        Find a ticket for our next Osheaga Musique et art Festival
      </h1>
      <p className="my-6 text-gray-500 dark:text-gray-300">
        This event will take place on 20 December 2021
      </p>
      <Link
        to="/search"
        className="px-6 py-2 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 md:mx-0 md:w-auto focus:outline-none"
      >
        Find your ticket
      </Link>
    </div>
  );
}

export default HomePage;
