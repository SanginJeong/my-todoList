import React from 'react'
import './TodoCard.style.css';
const TodoCard = ({schedule, handleDeleteSchedule, handleSchedule}) => {
  return (
    <div className='todo-card' onClick={()=>{handleSchedule(schedule)}}>
      <p className={`todo-card-title ${schedule.isDone && 'todo-checked'}`}>{schedule.title}</p>
      <div className='todo-card-btn-area'>
        <button className='todo-done-btn'><i class="fa-solid fa-check"></i></button>
        <button onClick={(e)=>{handleDeleteSchedule(schedule._id, e)}} className='todo-delete-btn'><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  )
}

export default TodoCard