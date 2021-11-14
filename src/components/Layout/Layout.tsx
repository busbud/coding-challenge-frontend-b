import React from "react";
import Landscape from "../../images/landscape.svg";
import NavBar from "../NavBar";

export interface ContainerProps {
  children: React.ReactNode;
}

function Layout({ children }: ContainerProps): JSX.Element {
  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <div className="inset-0 bg-black opacity-25 absolute" />
      <img
        src={Landscape}
        alt=""
        className="absolute h-full h-screen w-screen object-cover"
      />
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-4 h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;
