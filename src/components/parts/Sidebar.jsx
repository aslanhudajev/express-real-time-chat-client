import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

const friends = [
  { username: "Jason", _id: 1 },
  { username: "Tyler", _id: 2 },
  { username: "Marian", _id: 3 },
];

function Sidebar({ setChatIsOpen }) {
  async function handleOpenRoom() {
    setChatIsOpen(true);
  }

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
        {friends.map((friend) => (
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
