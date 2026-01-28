import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import '../styles/Todos.css';

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post('/api/todos', todo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([response.data, ...todos]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, updatedTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h1>My Todos</h1>
        <p>Welcome, {user?.username}!</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <TodoForm onAddTodo={handleAddTodo} />

      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="no-todos">No todos yet. Create one to get started!</p>
      ) : (
        <div className="todos-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};
