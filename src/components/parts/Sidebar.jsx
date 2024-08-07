import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { userContext } from "@/Contexts";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import axios from "axios";

function Sidebar() {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const [requestData, setRequestData] = useState({ receiver: "" });
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestSendErrors, setRequestSendErrors] = useState();

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

  const handleSendRequest = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/request/send`,
        requestData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setRequestDialogOpen(false);
    } catch (error) {
      setRequestSendErrors(error.response.data.message);
      console.log(error);
    }
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="sidebar h-full">
      <div className="sidebar-head mb-6 flex md:flex-row md:items-center md:justify-between sm:flex-col sm:items-start sm:justify-center">
        <h3>Friends</h3>
        <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send friend request</DialogTitle>
              <DialogDescription>
                Add a friend by submitting a username
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  className="col-span-3"
                  onChange={(e) => setRequestData({ receiver: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSendRequest} type="submit">
                Send request
              </Button>
            </DialogFooter>
            {requestSendErrors ? (
              <div className="flex flex-col items-center text-sm mt-4 gap-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{"Error"}</AlertTitle>
                  <AlertDescription>{requestSendErrors}</AlertDescription>
                </Alert>
              </div>
            ) : (
              <></>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="friends flex flex-col gap-3">
        {data.map((room) => (
          <Friend
            username={
              room.members[0].username === user.username
                ? room.members[1].username
                : room.members[0].username
            }
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
          <AvatarImage src="" />
          <AvatarFallback className="AvatarFallback">
            {username.toUpperCase()[0] + username.toUpperCase()[1]}
          </AvatarFallback>
        </Avatar>
        <p className="text-md font-medium leading-none">{username}</p>
      </div>
    </Link>
  );
}

export default Sidebar;
