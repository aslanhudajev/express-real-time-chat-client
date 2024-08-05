import { userContext } from "./Contexts";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavHeader from "./components/parts/NavigationHeader";
import Sidebar from "./components/parts/Sidebar";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_AUTH_URL}/authenticate`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        await setUser(result.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    authenticate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={user}>
        <NavHeader />
        <main className=" grid grid-cols-6 h-[calc(100vh-72px)]">
          <section className="sidebar-container bg-gray-100 p-4 col-span-1">
            {user ? <Sidebar /> : <></>}
          </section>
          <section className="room-container col-span-5 p-4">
            <Outlet />
          </section>
        </main>
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
