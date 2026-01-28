import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

export const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Todo App</h1>
        <p>Manage your tasks efficiently with our simple and powerful todo app</p>
        {isAuthenticated ? (
          <button onClick={() => navigate('/todos')} className="btn-primary">
            Go to Todos
          </button>
        ) : (
          <div className="button-group">
            <button onClick={() => navigate('/login')} className="btn-primary">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn-secondary">
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
