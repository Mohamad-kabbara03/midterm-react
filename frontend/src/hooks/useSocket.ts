// hooks/useSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { Socket, io } from 'socket.io-client';
import { getToken } from '../utils/localStorageUtils';

interface Message {
  senderId: number;
  receiverId: number;
  message: string;
  sessionId: number;
}

const ENDPOINT = 'http://localhost:3001';

const useSocket = (sessionId: number): { socket: Socket | null, messages: Message[], sendMessage: (messageData: Message) => void, setMessages: React.Dispatch<React.SetStateAction<Message[]>> } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'], 
      query: { sessionId },
      auth: { token: getToken() }
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat session:', sessionId);
      newSocket.emit('joinSession', sessionId);
    });

    newSocket.on('newMessage', (data) => {
      console.log('Received new message:', data);
      setMessages(prev => [...prev, {
        senderId: data.sender.userid,
        receiverId: data.receiver.userid,
        message: data.messageContent,
        sessionId: data.session.sessionId
      }]);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from chat session');
    });

    setSocket(newSocket);

    return () => {
      console.log('Closing WebSocket connection...');
      newSocket.close();
    };
  }, [sessionId]);

  const sendMessage = useCallback((messageData: Message) => {
    if (socket && socket.connected) {
      console.log('Sending message:', messageData);
      socket.emit('sendMessage', messageData);
    }
  }, [socket]);

  return { socket, messages, sendMessage, setMessages };
};

export default useSocket;
