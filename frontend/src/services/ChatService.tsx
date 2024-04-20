// ChatService.ts
import http from "../http-common";
import axios from 'axios';

interface SendMessageData {
  senderId: number;
  receiverId: number;
  message: string;
  sessionId: number;
}

interface SessionData {
  user1Id: number;
  user2Id: number;
}

const startChat = async (user1Id: number, user2Id: number, authToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/chat/start",
      { user1Id, user2Id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    console.log('Chat session started:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error starting chat session:', error);
    throw error;
  }
};

const sendMessage = (data: SendMessageData, authToken: string) => {
  return http.post("/chat/send", data, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};

const getChatHistory = (sessionId: number) => {
  return http.get(`/chat/history/${sessionId}`);
};

const findOrCreateSession = async (user1Id: number, user2Id: number, authToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/chat/session",
      { user1Id, user2Id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    console.log('Session details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error finding or creating session:', error);
    throw error;
  }
};

const ChatService = {
  startChat,
  sendMessage,
  getChatHistory,
  findOrCreateSession // Add this to expose it for use in components
};

export default ChatService;
