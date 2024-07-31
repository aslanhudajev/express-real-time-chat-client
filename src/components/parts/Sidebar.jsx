import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

const user = { username: "admin", _id: "66aaaade75a3e1daa7f9c49c" };

function Sidebar({ setChatIsOpen, setCurrentFriendUsername }) {
  function handleOpenRoom(e) {
    e.stopPropagation();
    setCurrentFriendUsername(e.currentTarget.dataset.username);
    setChatIsOpen(true);
  }

  const friends = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/friends`);
      return result.json();
    },
  });

  return (
    <div className="sidebar h-full">
      <div className="sidebar-head mb-6 flex flex-row justify-between items-center">
        <h3>Friends</h3>
        <CirclePlus
          className="cursor-pointer"
          size={20}
          strokeWidth={2.5}
          onClick={() => alert("Hi")}
        />
      </div>
      <div className="friends flex flex-col gap-3">
        {rooms.map((friend) => (
          <Friend
            username={friend.username}
            key={friend._id}
            handleOpenRoom={handleOpenRoom}
          />
        ))}
      </div>
    </div>
  );
}

function Friend({ username, handleOpenRoom }) {
  return (
    <div
      onClick={handleOpenRoom}
      className="sidebar-friend space-y-1 flex flex-row items-center gap-2 cursor-pointer"
      data-username={username}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <p className="text-md font-medium leading-none">{username}</p>
    </div>
  );
}

export default Sidebar;
