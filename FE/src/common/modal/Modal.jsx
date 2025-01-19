import React from 'react'
import './Modal.style.css';
import dayjs from 'dayjs';

const Modal = ({children, onClose, onClickContent}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={onClickContent}>
        {children}
      </div>
    </div>
  )
}

export default Modal;

Modal.addScheduleForm = ({onClose, onSubmit}) => {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input type="text" name="title" placeholder="할 일을 입력하세요."/>
      <label htmlFor="date">날짜</label>
      <input type="date" name="date" defaultValue={dayjs().format('YYYY-MM-DD')}/>
      <button type="submit" className="submit-button">ADD</button>
      <button type="button" className="modal-close" onClick={onClose}>CLOSE</button>
    </form>
  )
}

Modal.updateScheduleForm = ({onClose,onSubmit, selectedSchedule}) => {  
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input type="text" name="title" placeholder={selectedSchedule.title}/>
      <label htmlFor="date">날짜</label>
      <input type="date" name="date" defaultValue={dayjs(selectedSchedule.date).format('YYYY-MM-DD')}/>
      <button type="submit" className="submit-button">UPDATE</button>
      <button type="button" className="modal-close" onClick={onClose}>CLOSE</button>
    </form>
  )
}