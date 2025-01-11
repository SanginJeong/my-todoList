import React from 'react'
import './Modal.style.css';
import dayjs from 'dayjs';
const Modal = ({children, isOpen, onClose}) => {
  const onClickContent = (e) =>{
    e.stopPropagation();
  }

  if(!isOpen){
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={onClickContent}>
        {children}
      </div>
    </div>
  )
}

export default Modal

// 새로운 일을 추가할 때, 카드를 클릭해서 들어왔을 때
Modal.form = ({onClose, schedule, onSubmit}) => {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input type="text" name="title" placeholder={schedule?.title || "할 일을 입력하세요."}/>
      <label htmlFor="date">날짜</label>
      <input type="date" name="date" defaultValue={dayjs(schedule?.date).format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')}/>
      <button type="submit" className="submit-button">
        {schedule ? "UPDATE" : "ADD"}
      </button>
      <button type="button" className="modal-close" onClick={onClose}>CLOSE</button>
    </form>
  )
}

Modal.addScheduleForm = ({onClose, handleAddSchedule}) => {
  return (
    <Modal.form onClose={onClose} onSubmit={handleAddSchedule}/>
  )
}

Modal.updateScheduleForm = ({onClose,schedule}) => {
  return (
    <Modal.form onClose={onClose} schedule={schedule}/>
  )
}