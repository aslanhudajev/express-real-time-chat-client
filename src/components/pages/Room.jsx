import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Chat from "../parts/Chat";
import axios from "axios";

function Room() {
  const params = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat messages", params.roomId],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/room/${params.roomId}`,
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

  return <Chat roomId={params.roomId} messagesData={data} />;
}
export default Room;
