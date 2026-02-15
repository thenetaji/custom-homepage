import React, { useState, useEffect } from 'react';
import styles from '../styles/todo.module.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={styles.container}>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addButton}>
          Add
        </button>
      </div>

      {todos.length > 0 && (
        <>
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <div className={styles.todoContent}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={styles.checkbox}
                  />
                  <span
                    className={`${styles.todoText} ${
                      todo.completed ? styles.completed : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <span className={styles.count}>
              {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
            </span>
            {todos.some((todo) => todo.completed) && (
              <button onClick={clearCompleted} className={styles.clearButton}>
                Clear completed
              </button>
            )}
          </div>
        </>
      )}

      {todos.length === 0 && (
        <p className={styles.emptyMessage}>No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;