import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ChatBox() {
  return (
    <div className="chatbox flex flex-row w-full gap-2">
      <Input type="text" placeholder="Type a message..." />
      <Button>Send</Button>
    </div>
  );
}
export default ChatBox;
