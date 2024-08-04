import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

import ChatBox from "./ChatBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Chat({ roomId, messagesData }) {
  const EVENT_NEW_MSG = "NEW_MSG";
  const user = { username: "admin", _id: "66aaaade75a3e1daa7f9c49c" };

  const ioRef = useRef(null);

  const [messages, setMessages] = useState();
  const [room, setRoom] = useState();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessages([...messagesData]);
    setRoom(roomId);
  }, [messagesData]);

  useEffect(() => {
    ioRef.current = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
      query: { roomId },
    });

    ioRef.current.on(import.meta.env.VITE_SOCKET_EVENT_NEW_MSG, (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
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

  const handleNewMessageSend = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat flex flex-col items-center h-full">
      <div className="messages h-full w-full">
        {messages
          ? messages.map((message) => {
              if (message.user === user._id) {
                return (
                  <Message
                    content={message.content}
                    friend={false}
                    key={message._id}
                  />
                );
              } else {
                return (
                  <Message
                    content={message.content}
                    friend={true}
                    key={message._id}
                  />
                );
              }
            })
          : "Loading..."}
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

function Message({ content, friend }) {
  if (friend === false) {
    return (
      <div className="flex w-full justify-end">
        <div className="flex gap-3 items-center">
          <span className="bg-accent p-3 rounded-md max-w-xs">{content}</span>
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex justify-center items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PR</AvatarFallback>
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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </span>
          <span className="bg-accent p-3 rounded-md max-w-xs">{content}</span>
        </div>
      </div>
    );
  }
}
