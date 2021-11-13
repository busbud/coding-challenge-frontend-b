import React from "react";

function NavBar(): JSX.Element {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <nav className="container mx-auto px-6 md:px-12 py-4">
        <div className="md:flex justify-between items-center">
          <div className="flex justify-between items-center">
            <a href="/" className="text-white">
              <svg
                className="w-8 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Capa 1"
                viewBox="0 0 16.16 12.57"
              >
                <defs />
                <path d="M14.02 4.77v7.8H9.33V8.8h-2.5v3.77H2.14v-7.8h11.88z" />
                <path d="M16.16 5.82H0L8.08 0l8.08 5.82z" />
              </svg>
            </a>
            <div className="md:hidden">
              <button type="button" className="text-white focus:outline-none">
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <a
              href="/"
              className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300"
            >
              Search
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
