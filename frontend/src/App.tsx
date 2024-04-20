// App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserTable from './components/UserTable';
import Login3 from './pages/Login3';
import Dashboard from './pages/Dashboard';
import Chat from './components/Chat';

function App() {
  const handleLoginSuccess = () => {
    console.log('Login successful!');
  };
  
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login3 onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/users" element={<UserTable />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat/:userId" element={<Chat />} />
              </Routes>
            </div>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
