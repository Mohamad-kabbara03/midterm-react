// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import UserService from '../services/UserService';
import { useLocation } from 'react-router-dom';

interface UserContextType {
  userId: number | null;
  sessionId: number | null;
  setUserId: (id: number | null) => void;
  setSessionId: (id: number | null) => void;
}

const defaultState: UserContextType = {
  userId: null,
  sessionId: null,
  setUserId: () => {},
  setSessionId: () => {}
};

const  UserContext = createContext<UserContextType>(defaultState);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [senderId, setSenderId] = useState<number | null>(null);
  const location = useLocation();

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


  return (
    <UserContext.Provider value={{ userId, sessionId, setUserId, setSessionId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
