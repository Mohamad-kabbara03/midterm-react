import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";import useSocket from "../hooks/useSocket";
import UserService from "../services/UserService";

const Chat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const [newMessage, setNewMessage] = useState<string>("");
  const [senderId, setSenderId] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const { messages, sendMessage, setMessages } = useSocket(sessionId ?? 0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await UserService.getUserDetails();
        if (userDetails.data && userDetails.data.userId) {
          setSenderId(userDetails.data.userId);
          setSessionId(location.state?.sessionId as number);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleSendMessage = () => {
    if (!senderId || !userId || !sessionId) {
      console.error("Sender ID, User ID, or Session ID not found");
      return;
    }

    const messageData = {
      senderId: senderId,
      receiverId: parseInt(userId),
      message: newMessage,
      sessionId: sessionId,
    };

    console.log("Sending message:", messageData);
    sendMessage(messageData);
    setNewMessage(""); // Clear the input after sending
  };


  return (
    <div>
      <h2>Chat with User ID: {userId}</h2>
      <div>
        {/* Chat Interface */}
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
            height: "200px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <p key={index}>
              {msg.senderId === senderId ? "You" : "Them"}: {msg.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
