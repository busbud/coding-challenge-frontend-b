import React, { FC } from "react";
import Loader from "react-loader-spinner";

const LoadingIndicator: FC = () => {
  return (
    <div className="w-full flex justify-center">
      <Loader
        type="ThreeDots"
        color="#127cca"
        height={100}
        width={100}
        timeout={10000}
      ></Loader>
    </div>
  );
};

export default LoadingIndicator;
