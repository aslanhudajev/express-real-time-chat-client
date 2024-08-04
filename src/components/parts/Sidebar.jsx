import { useContext } from "react";
import { userContext } from "@/Contexts";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

function Sidebar() {
  const user = useContext(userContext);
  console.log(user);

  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/rooms`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        return result.data;
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="sidebar h-full">
      <div className="sidebar-head mb-6 flex flex-row justify-between items-center">
        <h3>Friends</h3>
        <CirclePlus
          className="cursor-pointer"
          size={20}
          strokeWidth={2.5}
          //! ADD A ADD FRIEND FUNCTION
          onClick={() => alert("Hi")}
        />
      </div>
      <div className="friends flex flex-col gap-3">
        {data.map((room) => (
          <Friend
            username={room.members[1].username}
            roomId={room._id}
            key={room._id}
          />
        ))}
      </div>
    </div>
  );
}

function Friend({ roomId, username }) {
  return (
    <Link to={`/room/${roomId}`}>
      <div
        className="sidebar-friend space-y-1 flex flex-row items-center gap-2 cursor-pointer"
        data-username={username}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <p className="text-md font-medium leading-none">{username}</p>
      </div>
    </Link>
  );
}

export default Sidebar;
