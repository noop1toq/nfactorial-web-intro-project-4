import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [trashedTodos, setTrashedTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentView, setCurrentView] = useState('addTasks');
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        if (updatedTodo.completed) {
          setCompletedTodos([...completedTodos, updatedTodo]);
        } else {
          const filteredCompletedTodos = completedTodos.filter(
            (completedTodo) => completedTodo.text !== updatedTodo.text
          );
          setCompletedTodos(filteredCompletedTodos);
        }
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleMoveToTrash = (index, fromView) => {
    let trashedTodo;
    if (fromView === 'addTasks') {
      trashedTodo = todos[index];
      setTrashedTodos([...trashedTodos, trashedTodo]);
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } else if (fromView === 'completedTasks') {
      trashedTodo = completedTodos[index];
      setTrashedTodos([...trashedTodos, trashedTodo]);
      const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
      setCompletedTodos(updatedCompletedTodos);
    }
  };

  const handleMoveToTodo = (index) => {
    const todo = trashedTodos[index];
    setTodos([...todos, todo]);
    const updatedTrashedTodos = trashedTodos.filter((_, i) => i !== index);
    setTrashedTodos(updatedTrashedTodos);
  };

  const handleDeleteForever = (index) => {
    const updatedTrashedTodos = trashedTodos.filter((_, i) => i !== index);
    setTrashedTodos(updatedTrashedTodos);
  };

  const handleSwitchView = (view) => {
    setCurrentView(view);
  };

  const handleMouseEnter = (index) => {
    setHoveredTask(index);
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  const renderAddTasks = () => {
    return (
      <div>
        <h1>Add Tasks</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(index)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              {todo.completed && (
                <button
                  className={index === hoveredTask ? 'show-button' : 'hide-button'}
                  onClick={() => handleMoveToTrash(index, 'addTasks')}
                >
                  Move to Trash
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCompletedTasks = () => {
    return (
      <div>
        <h1>Completed Tasks</h1>
        <ul>
          {completedTodos.map((todo, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span style={{ textDecoration: 'line-through' }}>{todo.text}</span>
              <button
                className={index === hoveredTask ? 'show-button' : 'hide-button'}
                onClick={() => handleMoveToTrash(index, 'completedTasks')}
              >
                Move to Trash
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderTrash = () => {
    return (
      <div>
        <h1>Trash</h1>
        <ul>
          {trashedTodos.map((todo, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span>{todo.text}</span>
              <button
                className={index === hoveredTask ? 'show-button' : 'hide-button'}
                onClick={() => handleMoveToTodo(index)}
              >
                Move to Todo
              </button>
              <button
                className={index === hoveredTask ? 'show-button' : 'hide-button'}
                onClick={() => handleDeleteForever(index)}
              >
                Delete Forever
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <div>
          <button onClick={() => handleSwitchView('addTasks')}>Add Tasks</button>
          <button onClick={() => handleSwitchView('completedTasks')}>Completed Tasks</button>
          <button onClick={() => handleSwitchView('trash')}>Trash</button>
        </div>
      </div>
      <div>
        {currentView === 'addTasks' ? renderAddTasks() : null}
        {currentView === 'completedTasks' ? renderCompletedTasks() : null}
        {currentView === 'trash' ? renderTrash() : null}
      </div>
    </div>
  );
};

export default TodoList;