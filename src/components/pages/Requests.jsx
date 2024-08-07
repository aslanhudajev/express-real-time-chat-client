import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { userContext } from "@/Contexts";
import { Button } from "../ui/button";
import { useContext } from "react";
import axios from "axios";

function Requests() {
  const user = useContext(userContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/requests`,
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

  const handleRequestAccept = () => {};

  const handleRequestDecline = () => {};

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full requests flex flex-col items-center">
      {data.map((request) => (
        <Request request={request} key={request._id} />
      ))}
    </div>
  );
}
export default Requests;

function Request({ request }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend request</CardTitle>
        <CardDescription>
          {`${request.sender.username} wants to connect with you!`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex-1 space-y-1">
          <div className="flex flex-col gap-2">
            <Button onClick={handleRequestAccept}>Accept</Button>
            <Button onClick={handleRequestDecline}>Decline</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
