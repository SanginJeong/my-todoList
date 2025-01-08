import React, { useState } from 'react'
import './Dropdown.style.css';
import TodoCard from '../TodoCard/TodoCard';

const Dropdown = ({day,children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <ul className='dropdown'>
      <li>
        <div className='dropdown-menu' onClick={handleDropDown}>{day.date} ({day.schedules.length})</div>
        <ul className={`dropdown-item ${isOpen && 'active'}`}>
          {children}
        </ul>
      </li>
    </ul>
  )
}

export default Dropdown