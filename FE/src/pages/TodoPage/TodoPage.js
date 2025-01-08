import React, { useState } from 'react'
import './TodoPage.style.css';
import { TodoContent } from './TodoContext/TodoContent';
import { TodoProvider } from './TodoContext/TodoContext';

const TodoPage = () => {
  return (
    <TodoProvider>
      <TodoContent/>
    </TodoProvider>
  )
}

export default TodoPage;