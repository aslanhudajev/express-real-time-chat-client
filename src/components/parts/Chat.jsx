import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import { userContext } from "@/Contexts";
import { useState, useEffect, useRef, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Chat({ roomId, messagesData }) {
  const ioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const user = useContext(userContext);
  const [messages, setMessages] = useState();
  const [room, setRoom] = useState();
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    console.log("scrolling");
    messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    setMessages([...messagesData]);
    setRoom(roomId);
    scrollToBottom();
  }, [messagesData]);

  useEffect(() => {
    ioRef.current = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      query: { roomId },
    });

    ioRef.current.on(import.meta.env.VITE_SOCKET_EVENT_NEW_MSG, (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
      scrollToBottom();
    });

    return () => {
      ioRef.current.disconnect();
    };
  }, [messagesData]);

  const sendMessage = (content) => {
    ioRef.current.emit(import.meta.env.VITE_SOCKET_EVENT_NEW_MSG, {
      user: user._id,
      content: content,
      room: room,
      date: new Date(),
    });
  };

  const handleNewMessageWrite = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSend = (event) => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat flex flex-col items-center h-full">
      <div className="messages p-3 pb-0 gap-3 flex flex-col grow-0 items-start w-full h-full max-h-[calc(100vh-72px-72px)] overflow-y-scroll scroll-mx-4">
        {messages
          ? messages.map((message) => {
              return (
                <Message
                  content={message.content}
                  sender={message.user}
                  user={user}
                  key={message._id}
                />
              );
            })
          : "Loading..."}
        <div className="p-2 w-full" ref={messagesEndRef}></div>
      </div>
      <ChatBox
        newMessage={newMessage}
        handleNewMessageWrite={handleNewMessageWrite}
        handleNewMessageSend={handleNewMessageSend}
      />
    </div>
  );
}
export default Chat;

function Message({ content, sender, user }) {
  if (user._id === sender._id) {
    return (
      <div className="flex w-full justify-end">
        <div className="flex gap-3 items-center">
          <span className="bg-accent p-3 rounded-md max-w-xs">{content}</span>
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex justify-center items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="AvatarFallback">
                {sender.username.toUpperCase()[0] +
                  sender.username.toUpperCase()[1]}
              </AvatarFallback>
            </Avatar>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <div className="flex gap-3 items-center">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex justify-center items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="AvatarFallback">
                {sender.username.toUpperCase()[0] +
                  sender.username.toUpperCase()[1]}
              </AvatarFallback>
            </Avatar>
          </span>
          <span className="bg-accent p-3 rounded-md max-w-xs">{content}</span>
        </div>
      </div>
    );
  }
}
