import React from 'react'
import './TodoModal.style.css';
import {getToday} from '../../../constant/getToday/getToday';
import dayjs from 'dayjs';
const TodoModal = ({isOpen, handleCloseModal, clickedSchedule, handleSaveSchedule, handleContentClick}) => {

  if (!isOpen) {
    return null;
  } 
  
  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={handleContentClick}>
        <form className="todo-form" onSubmit={handleSaveSchedule}>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" placeholder={clickedSchedule ? clickedSchedule.title : "할 일을 입력하세요"} />
          <label htmlFor="date">날짜</label>
          <input type="date" id="date" name="date" defaultValue={clickedSchedule ? dayjs(clickedSchedule.date).format('YYYY-MM-DD') : getToday()}/>
          <button type="submit" className="submit-button">
            {clickedSchedule ? "UPDATE" : "ADD"}
          </button>
          <button type="button" className="modal-close" onClick={handleCloseModal}>CLOSE</button>
        </form>
      </div>
    </div>
  );
};

export default TodoModal