import React from 'react'
import './Card.style.css';
const Card = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Card

// TodoCard인지 아니면 추후에 다른 형태의 카드가 올건지
Card.layout = ({className,children}) => {
  return <div className={className}>{children}</div>
}

Card.onSelect = ({children, onSelectSchedule}) => {
  return (
    <div onClick={onSelectSchedule}>
      {children}
    </div>
  )
}

Card.todoTitle = ({children, isDone}) => {
  return <p className={`todo-card-title ${isDone && "todo-checked"}`}>{children}</p>
}



Card.todoButtons = ({children}) => {
  return <div className='todo-card-btn-area'>{children}</div>
}