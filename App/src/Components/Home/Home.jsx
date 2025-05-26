import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Home.css';

function Home() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();  

  const fetchTodos = () => {
    axios.get('http://localhost:5000/todos/get', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setTodos(response.data);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = () => {
    if (task.trim() === '') return;

    axios.post('http://localhost:5000/todos/post',
      { title: task, description: '' },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(result => {
        setTodos([result.data, ...todos]); // Add new task at the top
        setTask('');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/todos/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch(err => console.log(err));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');             
  };

  return (
    <div className='file'>
      <div className="fixed-header">
        <h2>Todo List</h2>
        <div className="create_form">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {todos.length === 0 ? (
        <div><h2>No records found</h2></div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span className="bullet">•</span>
              <span
                className={`task-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => toggleComplete(todo._id)}
              >
                {todo.title}
              </span>
              <button onClick={() => handleDelete(todo._id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
