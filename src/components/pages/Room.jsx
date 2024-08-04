import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Chat from "../parts/Chat";
import { useState } from "react";

function Room() {
  const params = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat messages", params.roomId],
    queryFn: async () => {
      const result = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/room/${params.roomId}`
      );
      const d = await result.json();
      console.log("test " + params.roomId + d[0].content);
      return d;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <Chat roomId={params.roomId} messagesData={data} />;
}
export default Room;
