import { useState } from "react";
import { Outlet } from "react-router-dom";
import socket from "./socket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//parts
import NavHeader from "./components/parts/NavigationHeader";
import Sidebar from "./components/parts/Sidebar";
import ChatBox from "./components/parts/ChatBox";
import Chat from "./components/parts/Chat";

const queryClient = new QueryClient();

function App() {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [currentFriendUsername, setCurrentFriendUsername] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <main className=" grid grid-cols-6 h-[calc(100vh-72px)]">
        <section className="sidebar-container bg-gray-100 p-4 col-span-1">
          <Sidebar
            setChatIsOpen={setChatIsOpen}
            setCurrentFriendUsername={setCurrentFriendUsername}
          />
        </section>
        <section className="room-container col-span-5 p-4">
          {chatIsOpen === true ? (
            <Chat currentFriendUsername={currentFriendUsername} />
          ) : (
            <></>
          )}
        </section>
      </main>
    </QueryClientProvider>
  );
}

export default App;
