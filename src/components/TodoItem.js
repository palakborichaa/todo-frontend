import React, { useState } from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, {
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleSaveEdit = () => {
    onUpdate(todo._id, {
      ...todo,
      ...editData,
    });
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSaveEdit} className="btn-save">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              className="todo-checkbox"
            />
            <div className="todo-text">
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
          </>
        )}
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(todo._id)} className="btn-delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
