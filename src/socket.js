import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";

const URL = "http://localhost:3000";
const EVENT_NEW_MSG = "NEW_MSG";
const user = { username: "admin", _id: "66aaaade75a3e1daa7f9c49c" };

export default function useChat(roomId, persistedMessages) {
  const id = useRef(uuid());
  const messages = persistedMessages;
  const ioRef = useRef(null);

  useEffect(() => {
    console.log(id.current);
    console.log(messages);
    ioRef.current = io(URL, {
      query: { roomId },
    });

    ioRef.current.on(EVENT_NEW_MSG, (message) => {
      messages.push(message);
      console.log(messages);
    });

    return () => {
      ioRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (content) => {
    ioRef.current.emit(EVENT_NEW_MSG, {
      user: user._id,
      content: content,
      room: roomId,
      date: new Date(),
    });
  };

  return { messages, sendMessage };
}
