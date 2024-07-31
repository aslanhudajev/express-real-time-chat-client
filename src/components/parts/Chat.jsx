import ChatBox from "./ChatBox";

function Chat({ chatIsOpen }) {
  return (
    <div className="chat flex flex-col items-center h-full">
      <div className="messages h-full"></div>
      <ChatBox />
    </div>
  );
}
export default Chat;
