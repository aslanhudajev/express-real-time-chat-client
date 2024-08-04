import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ChatBox({ newMessage, handleNewMessageWrite, handleNewMessageSend }) {
  return (
    <div className="chatbox flex flex-row w-full gap-2">
      <Input
        type="text"
        placeholder="Type a message..."
        onChange={handleNewMessageWrite}
        value={newMessage}
      />
      <Button onClick={handleNewMessageSend}>Send</Button>
    </div>
  );
}
export default ChatBox;
