import { useState } from "react";
import { Outlet } from "react-router-dom";
import socket from "./socket";

//parts
import NavHeader from "./components/parts/NavigationHeader";

function App() {
  return (
    <>
      <NavHeader />
      <main></main>
    </>
  );
}

export default App;
