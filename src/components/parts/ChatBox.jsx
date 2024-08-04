import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ChatBox({ newMessage, handleNewMessageWrite, handleNewMessageSend }) {
  return (
    <div className="chatbox flex flex-row w-full gap-2">
      <form
        onSubmit={handleNewMessageSend}
        className="flex flex-row w-full gap-2"
      >
        <Input
          type="text"
          placeholder="Type a message..."
          onChange={handleNewMessageWrite}
          value={newMessage}
        />
        <Button type="submit" onSubmit={handleNewMessageSend}>
          Send
        </Button>
      </form>
    </div>
  );
}
export default ChatBox;
