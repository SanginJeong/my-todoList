import React from 'react'
import './TodoPage.style.css';
import TodoToday from './todoComponent/todoToday/TodoToday';
import TodoWeek from './todoComponent/todoWeek/TodoWeek';
import Modal from '../../common/modal/Modal';
import { useAppendScheduleQuery } from '../../hooks/useAppendSchedule';
import { useDeleteScheduleQuery } from '../../hooks/useDeleteSchedule';
import { useGetScheduleListQuery } from '../../hooks/useGetScheduleList';
import { useUpdateScheduleInfoQuery } from '../../hooks/useUpdateScheduleInfo'
import { useModalStore } from '../../store/useModalStore';

const TodoPage = () => {
  const {selectedSchedule,isOpenAddModal, openAddModal, closeAddModal, onClickContent} = useModalStore();
  const {mutate: appendSchedule} = useAppendScheduleQuery();

  const handleAppendSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const date = formData.get("date");
    appendSchedule({title,date});
    closeAddModal();
  }

  return (
    <div className="todo-page">
      <div className='add-schedule-area'>
        <button onClick={openAddModal}>ADD Schedule</button>
      </div>

      <div className='todo-area'>
        <TodoToday/>
        <TodoWeek/>
      </div>

      
      {isOpenAddModal &&
        <Modal onClose = {closeAddModal} onClickContent={onClickContent}>
          <Modal.addScheduleForm onClose={closeAddModal} onSubmit={handleAppendSchedule}/>
        </Modal>
      }
    </div>
  )
}

export default TodoPage;