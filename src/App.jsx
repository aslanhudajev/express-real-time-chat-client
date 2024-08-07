import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavHeader from "./components/parts/NavigationHeader";
import Sidebar from "./components/parts/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userContext } from "./Contexts";
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
        <main className=" grid grid-cols-4 h-[calc(100vh-72px)]">
          <section className="sidebar-container flex flex-col bg-gray-100 p-4 col-span-1">
            {user ? <Sidebar /> : <></>}
            {user ? (
              <div className="self-end bg-gray-400 w-full rounded-md p-3">
                <div className="flex flex-row items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="AvatarFallback">
                      {user.username.toUpperCase()[0] +
                        user.username.toUpperCase()[1]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-medium leading-none">
                    {user.username}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section className="room-container col-span-3 p-4">
            <Outlet />
          </section>
        </main>
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
