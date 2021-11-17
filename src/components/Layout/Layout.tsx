import React from "react";
import NavBar from "../NavBar";

export interface ContainerProps {
  children: React.ReactNode;
}

function Layout({ children }: ContainerProps): JSX.Element {
  return (
    <section className="flex flex-col bg-blue-50 h-full overflow-y-auto">
      <NavBar />
      <div className="container px-6 py-16 mx-auto">{children}</div>
    </section>
  );
}

export default Layout;
