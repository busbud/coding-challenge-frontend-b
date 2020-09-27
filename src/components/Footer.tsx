import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="w-screen bg-bb-blue text-white h-40 p-10 mt-10 flex flex-col justify-center items-center text-center">
      <p>
        Hero image from{" "}
        <a
          href="https://unsplash.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Unsplash
        </a>
      </p>
      <p>
        Icons by{" "}
        <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Freepik
        </a>{" "}
        from{" "}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          flaticon.com
        </a>
      </p>

      <p>
        <a
          href="https://www.clairefroelichdev.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline block"
        >
          About the dev
        </a>
      </p>
    </div>
  );
};

export default Footer;
