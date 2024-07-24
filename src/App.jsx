import { useState } from "react";
import { Outlet } from "react-router-dom";
import socket from "./socket";

//parts
import NavHeader from "./components/parts/NavigationHeader";

function App() {
  return (
    <>
      <NavHeader />
      <main className=" grid grid-cols-3 h-svh">
        <section className="sidebar-container col-span-1"></section>
        <section className="room-container col-span-2"></section>
      </main>
    </>
  );
}

export default App;
