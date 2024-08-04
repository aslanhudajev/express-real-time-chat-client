import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//parts
import NavHeader from "./components/parts/NavigationHeader";
import Sidebar from "./components/parts/Sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <main className=" grid grid-cols-6 h-[calc(100vh-72px)]">
        <section className="sidebar-container bg-gray-100 p-4 col-span-1">
          <Sidebar />
        </section>
        <section className="room-container col-span-5 p-4">
          <Outlet />
        </section>
      </main>
    </QueryClientProvider>
  );
}

export default App;
