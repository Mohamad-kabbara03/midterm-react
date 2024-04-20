import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import ChatService from '../services/ChatService';
import { getToken } from '../utils/localStorageUtils';


interface User {
  userid: number;
  email: string;
}

const UserTable = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from route parameters
  const [users, setUsers] = useState<User[]>([]);
  const token = getToken()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getAll();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const startChat = async (selectedUserId: number) => {
    try {
        // Fetch current user details, usually this should be cached or stored once logged in
        const userDetailsResponse = await UserService.getUserDetails();
        if (!userDetailsResponse.data) {
          throw new Error("Failed to retrieve user details.");
        }
        const currentUserId = userDetailsResponse.data.userId;

        // Ideally, this service call should manage checking/creating sessions
        const response = await ChatService.findOrCreateSession(currentUserId, selectedUserId, token!);
        if (!response.sessionId) {
          throw new Error("Session could not be started.");
        }
        console.log(currentUserId, ',',selectedUserId);

        // Navigate to the chat page with the existing or new session ID
        navigate(`/chat/${selectedUserId}`, { state: { sessionId: response.sessionId } });
    } catch (error) {
        console.error('Error starting chat session:', error);
        // Consider handling user feedback here, like a notification or alert
    }
};


  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => startChat(user.userid)}>Chat</button> {/* Pass selected user ID to startChat */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
